import https from 'https';

export enum Telegram_ParseModes {
	MarkdownV2,
	HTML,
}

export default class Telegram {
	private readonly api: string;

	private updates?: number;

	constructor(api: string) {
		this.api = api;
	}

	public async send(id: number | string, text: string, parseMode?: Telegram_ParseModes): Promise<boolean> {
		return (await this.request('/sendMessage', {
			chat_id: id,
			text: text,
			parse_mode: parseMode === undefined ? undefined : Telegram_ParseModes[parseMode],
		})).ok;
	}

	public async findID(): Promise<Record<string, number>> {
		const updates = await this.request<{
			result: {
				update_id: number;
				message: {
					from: {
						id: number;
						is_bot: boolean;
						username: string;
					};
				};
			}[];
		}>('/getUpdates', this.updates === undefined ? undefined : { offset: this.updates });

		const users: Record<string, number> = {};
		const result = updates.result;

		if (result) {
			const resultLength = result.length;

			for (let i = 0; i < resultLength; i++) {
				const item = result[i];

				if (!item.message.from.is_bot) {
					users[item.message.from.username] = item.message.from.id;
				}
			}

			this.updates = result[resultLength - 1].update_id + 1;
		}

		return users;
	}

	private request<T extends Record<string, any>>(path: string, data?: Record<string, any>): Promise<{ ok: boolean; } & Partial<T>> {
		return new Promise((resolve, reject) => {
			const req = https.request('https://api.telegram.org/bot' + this.api + path, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
			}, (res) => {
				let result = '';

				res
					.setEncoding('utf-8')
					.on('data', (chunk) => {
						result += chunk;
					})
					.on('end', () => {
						resolve(JSON.parse(result));
					});
			}).on('error', reject);

			if (data) {
				req.write(JSON.stringify(data));
			}

			req.end();
		});
	}
}

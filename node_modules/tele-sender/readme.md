# Tele Sender

A simple Telegram message sender written in Typescript with zero dependencies.

> See how it's implemented at [my blog post](https://nocache.org/p/build-a-telegram-bot-to-send-notifications-in-node-js-with-typescript).

## Installation

```sh
npm i tele-sender
```

## Usage

```ts
import Telegram, { Telegram_ParseModes } from 'tele-sender';

const telegram = new Telegram('api_key');

telegram.send('chat_id', '*Hello World\\!*', Telegram_ParseModes.MarkdownV2);
```

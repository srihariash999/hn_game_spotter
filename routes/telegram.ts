import Telegram, { Telegram_ParseModes } from "tele-sender";
const e = require("express");
const router = e.Router();
const config = require("config");

//* Telegram API.
router.post("/", async (req: any, res: any) => {
  let bot_key = config.get("bot_api_key");
  let chat_id = config.get("chat_id");

  const telegram = new Telegram(bot_key);
  let dt = new Date().toLocaleString();
  console.log(dt.toString());
  let msg = "Automated message from API call at  -  " + dt.toString();
  telegram.send(chat_id, msg, Telegram_ParseModes.MarkdownV2);
  res.send("Some response here yooo");
});

module.exports = router;

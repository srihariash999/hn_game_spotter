import Telegram, { Telegram_ParseModes } from "tele-sender";
const e = require("express");
const router = e.Router();
const config = require("config");

//* Telegram API.
router.post("/", async (req: any, res: any) => {
  let bot_key = config.get("bot_api_key");
  let chat_id = config.get("chat_id");

  let which_env = config.get("which_env");

  const telegram = new Telegram(bot_key);
  var r: boolean = await telegram.send(
    chat_id,
    "Hi there, this is an automated text from " + which_env,
    Telegram_ParseModes.MarkdownV2
  );
  // var r = await telegram.send(
  //   chat_id,
  //   which_env,
  //   Telegram_ParseModes.MarkdownV2
  // );
  console.log(" status " + r);
  res.send("Some response here yooo");
});

module.exports = router;

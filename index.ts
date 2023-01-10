const ex = require("express");
const app = ex();

const config = require("config");
const telegram = require("./routes/telegram");

if (!config.get("bot_api_key")) {
  console.error("FATAL ERROR: bot_api_key not defined");
  process.exit(1);
}

if (!config.get("chat_id")) {
  console.error("FATAL ERROR: chat_id not defined");
  process.exit(1);
}

app.use(ex.json());

app.use("/api/telegram", telegram);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));



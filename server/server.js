const express = require("express");
const morgan = require("morgan");

const PORT = 9999;

var app = express();

app
  .use(express.json({ limit: "50mb" }))
  .use(morgan("dev"))
  .use(require("./routes"));

const server = app.listen(PORT, function () {
  console.info("🌍 Listening on port " + server.address().port);
});

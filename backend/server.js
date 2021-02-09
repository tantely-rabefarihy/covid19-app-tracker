"use strict";

// importing  node modules
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
// const { ip } = require("./routes/constants");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(morgan("tiny"));

app.use(require("./routes/all-routes"));

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(PORT, () => {
  console.log(`🌍 Listening on PORT: ${PORT}`);
});

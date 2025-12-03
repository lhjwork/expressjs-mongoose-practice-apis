const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5124;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

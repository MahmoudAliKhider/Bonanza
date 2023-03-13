const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv/config");

app.use(morgan("tiny"));
app.use(express.json());

api = process.env.API;

mongoose
  .connect(process.env.CONNECTION,{
    useNewUrlParser : true
  })
  .then(() => {
    console.log("Database connected ...");
  })
  .catch((err) => {
    console.log(err);
  });

const port = 4000;
app.listen(() => {
  console.log(`server is running  http://localhost:${port}`);
});

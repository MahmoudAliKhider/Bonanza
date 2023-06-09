const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const authJwt = require("./helper/jwt");
const errorHandler = require("./helper/error-handler");

require("dotenv/config");

app.use(cors());
app.options("*", cors());

//middelware
app.use(morgan("tiny"));
app.use(express.json());
app.use(authJwt());
app.use('/public/upload',express.static(__dirname + '/public/upload'))
app.use(errorHandler)

api = process.env.API;

app.use(`${api}/products`, require("./routers/products"));
app.use(`${api}/users`, require("./routers/users"));
app.use(`${api}/orders`, require("./routers/orders"));
app.use(`${api}/categories`, require("./routers/categories"));

mongoose
  .connect(process.env.CONNECTION, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database connected ...");
  })
  .catch((err) => {
    console.log(err);
  });

const port = 4000;
app.listen(port, () => {
  console.log(`server is running  http://localhost:${port}`);
});

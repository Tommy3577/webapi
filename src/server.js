require("./db/connection");
const express = require("express");
const cors = require("cors");

const userRouter = require("./user/routes");
const movieRouter = require("./movie/routes");
const app = express();


app.use(express.json());
app.use(cors());
app.use(userRouter, movieRouter);


app.listen(5001, () => {
  console.log("Listening on port 5001");
});

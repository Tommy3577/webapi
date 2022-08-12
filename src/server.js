require("./db/connection"); // Run's database connection Immediately
const express = require("express");
const cors = require("cors");

const userRouter = require("./user/routes");
const movieRouter = require("./movie/routes");
const app = express();

app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true 
}));

//add relevant routes and controllers to app before listen runs
app.use(express.json()); // Tell entire server that it will always recieve JSON, and to always send back JSON
app.use(cors());
app.use(userRouter, movieRouter);

app.get("/health", (req, res) => {
  res.status(200).send({ message: "API is working" });
});

app.listen(5001, () => {
  console.log("Listening on port 5001");
});

const { Router } = require("express");
const movieRouter = Router();
const { } = require("../middleware");
const { createMovie, getAllMovies, updateMovie, deleteMovie } = require("./controllers");

movieRouter.post("/movie", createMovie);
movieRouter.get("/movie", getAllMovies);
movieRouter.patch("/movie", updateMovie);
movieRouter.delete("/movie", deleteMovie);

module.exports = movieRouter;
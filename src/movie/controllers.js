const Movie = require("./model");

exports.createMovie = async (req, res) => {
  try {
    const newMovie = await Movie.create(req.body);
    res.send({ msg: "This came from createMovie" });
  }
//-------------------------------------- 
  catch (error) {
    console.log(error);
    res.status(418).send({ err: error });
  }
};
//------------------------------------------------------------------------------------------------------------
exports.getAllMovies = async (req, res) => {
  try {
    console.log("Getting list of Movies...")
    const movies = await Movie.find({});
    const result = movies.map((m) => {
      return m.title;
    });
    console.log(result)
    res.send({ allMovies: result });
    // res.send({ msg: "This came from getAllMovies" })
  }
//--------------------------------------    
  catch (error) {
    console.log(error);
    res.status(418).send({ err: error });
  }
};
//------------------------------------------------------------------------------------------------------------
exports.updateMovie = async (req, res) => {
  try {
    if (req.body.newTitle) {
      const movie = await Movie.findOne({title: req.body.title})
      let oldTitle = req.body.title
      let newTitle = req.body.newTitle
      await Movie.updateOne({title: movie.title}, {$set: {title: req.body.newTitle}});
      res.send({ msg: "Title Updated"})
    }
//--------------------------------------  
    else if (req.body.newActor) {
      const movie = await Movie.findOne({actor: req.body.actor})
      let oldActor = req.body.actor
      let newActor = req.body.newActor
      await Movie.updateOne({actor: movie.actor}, {$set: {actor: req.body.newActor}});
      res.send({ msg: "Actor Updated"})
    }
//--------------------------------------  
    else {
      throw new Error("No newUpdate field detected")
    }
  }
//--------------------------------------  
  catch (error) {
    console.log(error)
    res.status(418).send({ error: error.message })
  }
}
//------------------------------------------------------------------------------------------------------------
exports.deleteMovie = async (req, res) => {
  try {
  await Movie.deleteOne({ title: req.body.title })
  res.send({ msg: "This came from deleteMovie" });
}
//--------------------------------------  
catch (error) {
  console.log(error);
  res.status(418).send({ err: error });
}
}
//------------------------------------------------------------------------------------------------------------
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/model");

exports.hashPass = async (req, res, next) => {
  try {
    if (!req.body.password) {
      next()
    }
    else {
    //take a password out of the body, hash that password with bcrypt, and then put it back in the body
    const pass = req.body.password;  //grab value
    const hashedPass = await bcrypt.hash(pass, 8); //hash value
    req.body.password = hashedPass; //re-store value
    // 3 above lines (excluding console.logs) in ONE line
    // req.body.password = await bcrypt.hash(req.body.password, 8); 
    next()
    }// moves onto next parameter
  } 
  catch (error) {
    console.log(error);
    res.status(418).send({ err: error });
  }
};

exports.comparePass = async (req, res, next) => {
  try {
    if (!req.body.password) {
      next()
    }
    else {
    //? Version 1
    // const user = await User.findOne({ username: req.body.username });
    // const matched = await bcrypt.compare(req.body.password, user.password);
    // if (matched) {
    //   next();
    // } 
    // else {
    //   throw new Error()
    // }
    //? Version 2
    req.user = await User.findOne({ username: req.body.username})
    if (req.user && (await bcrypt.compare(req.body.password, req.user.password))) {
    next()
    }
    else {
      throw new Error("Incorrect Credentials")
    }
    //find user in database, compare password from body with password from db with bcrypt
    //if successful pass user to controller through req, if unsuccessful send error
    }
  }
  catch (error) {
    console.log(error);
    res.status(418).send({ error: error.message })
  }
};

exports.updatePass = async (req, res, next) => {
  try {
    if (!req.body.params.newPassword) {
      next()
    }
    else {    
      req.user = await User.findOne({ username: req.body.params.username})
      if (req.user && (await bcrypt.compare(req.body.params.password, req.user.password))) {
        const newPass = req.body.params.newPassword;             //grab value
        const newHashedPass = await bcrypt.hash(newPass, 8); //hash value
        req.body.params.newPassword = newHashedPass;             //re-store value
        next()
      }
      else {
        throw new Error("Incorrect Credentials")
      }
    }    
  } catch (error) {
    console.log(error);
    res.status(418).send({ error: error.message });
  }
}

exports.tokenCheck = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const decodedToken = await jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken._id);
    req.user = user;
    next();
    //get the token from req, unlock the token, find the user with the id in the token, send the user to a controller
  } 
  catch (error) {
    console.log(error);
    res.status(418).send({ err: error })
  }
}
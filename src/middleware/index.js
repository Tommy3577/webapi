const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/model");

exports.hashPass = async (req, res, next) => {
  try {
    if (!req.body.password) {
      next()
    }
    else {
    const pass = req.body.password;
    const hashedPass = await bcrypt.hash(pass, 8);
    req.body.password = hashedPass;
    next()
  }
}
//--------------------------------------
  catch (error) {
    console.log(error);
    res.status(418).send({ err: error });
  }
};
//------------------------------------------------------------------------------------------------------------
exports.comparePass = async (req, res, next) => {
  try {
    if (!req.body.password) {
      next()
    }
    else {
    req.user = await User.findOne({ username: req.body.username})
    if (req.user && (await bcrypt.compare(req.body.password, req.user.password))) {
    next()
    }
    else {
      throw new Error("Incorrect Credentials")
    }
  }
}
//--------------------------------------
  catch (error) {
    console.log(error);
    res.status(418).send({ error: error.message })
  }
};
//------------------------------------------------------------------------------------------------------------
exports.updatePass = async (req, res, next) => {
  console.log(req.body)
  try {
    if (!req.body.updates.newPassword) {
      console.log("No password to update")
      next()
    }
    else {
      req.user = await User.findOne({ username: req.body.updates.username})
      if (req.user && (await bcrypt.compare(req.body.params.password, req.user.password))) {
        const newPass = req.body.updates.newPassword;
        const newHashedPass = await bcrypt.hash(newPass, 8);
        req.body.updates.newPassword = newHashedPass;
        next()
      }
      else {
        throw new Error("Incorrect Credentials")
      }
    }    
  } 
//--------------------------------------
  catch (error) {
    console.log(error);
    res.status(418).send({ error: error.message });
  }
}
//------------------------------------------------------------------------------------------------------------
exports.tokenCheck = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const decodedToken = await jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken._id);
    req.user = user;
    next();
  } 
//--------------------------------------  
  catch (error) {
    console.log(error);
    res.status(418).send({ err: error })
  }
}
//------------------------------------------------------------------------------------------------------------
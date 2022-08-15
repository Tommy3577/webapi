const jwt = require("jsonwebtoken")
const User = require("./model");

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.send({ msg: newUser });
  }
//--------------------------------------  
  catch (error) {
    console.log(error);
    res.status(418).send({ err: error });
  }
};
//------------------------------------------------------------------------------------------------------------
exports.login = async (req, res) => {
  try {
    const token = await jwt.sign({ _id: req.user._id }, process.env.SECRET);
    res.send({ user: req.user.username, token });
  } 
//--------------------------------------    
  catch (error) {
    console.log(error);
    res.status(418).send({ err: error });
  }
};
//------------------------------------------------------------------------------------------------------------
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    const result = users.map((u) => {
      return u.username;
    });
    console.log(result)
    res.send({ allUsers: result });
    // res.send({ msg: "This came from getAllUsers" })
  } 
//--------------------------------------  
  catch (error) {
    console.log(error);
    res.status(418).send({ err: error });
  }
};
//------------------------------------------------------------------------------------------------------------
exports.updateUser = async (req, res) => {
  try {
    console.log(req.body)
    if (req.body.updates.newUsername) {
      const user = await User.findOne({username: req.body.updates.username})
      let oldName = req.body.updates.username
      let newName = req.body.updates.newUsername
      await User.updateOne({username: user.username}, {$set: {username: req.body.updates.newUsername}});
      res.send({ msg: "Username Updated"})
    }
//--------------------------------------  
    else if (req.body.updates.newEmail) {
      const user = await User.findOne({username: req.body.updates.username})
      let oldName = req.body.updates.username
      let newEmail = req.body.updates.newEmail
      await User.updateOne({email: user.email}, {$set: {email: req.body.updates.newEmail}});
      res.send({ msg: "E-Mail Updated"})
    }
//--------------------------------------  
    else if (req.body.updates.newPassword) {
      const user = await User.findOne({username: req.body.updates.username})
      let oldPass = req.body.updates.password
      let newPass = req.body.updates.newPassword
      await User.updateOne({password: user.password}, {$set: {password: req.body.updates.newPassword}})
      res.send({ msg: "Password Updated"})
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
exports.deleteUser = async (req, res) => {
  try {
  await User.deleteOne({ username: req.body.username })
  res.send({ msg: "This came from deleteUser" });
}
//--------------------------------------  
  catch (error) {
  console.log(error);
  res.status(418).send({ err: error });
}
}
//------------------------------------------------------------------------------------------------------------
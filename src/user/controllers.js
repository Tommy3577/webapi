const jwt = require("jsonwebtoken")
const User = require("./model");

exports.createUser = async (req, res) => {
  try {
    console.log("Creating User...")
    const newUser = await User.create(req.body);
    res.send({ msg: newUser });
  }
  catch (error) {
    console.log(error);
    res.status(418).send({ err: error });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await jwt.sign({ _id: req.user._id }, process.env.SECRET); //create token with user._id inside
    res.send({ user: req.user.username, token });
  } catch (error) {
    console.log(error);
    res.status(418).send({ err: error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    const result = users.map((u) => {
      return u.username;
    });
    console.log(result)
    res.send({ allUsers: result });
  } catch (error) {
    console.log(error);
    res.status(418).send({ err: error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    console.log(req.body.params)                            //! params added to work with front-end
    if (req.body.params.newUsername) {
      const user = await User.findOne({username: req.body.params.username})
      await User.updateOne({username: user.username}, {$set: {username: req.body.params.newUsername}});
      res.send({ msg: "Username Updated"})
    }
    else if (req.body.params.newEmail) {
      const user = await User.findOne({username: req.body.params.username})
      await User.updateOne({email: user.email}, {$set: {email: req.body.params.newEmail}});
      res.send({ msg: "E-Mail Updated"})
    }
    else if (req.body.params.newPassword) {
      const user = await User.findOne({username: req.body.params.username})
      await User.updateOne({password: user.password}, {$set: {password: req.body.params.newPassword}})
      res.send({ msg: "Password Updated"})
    }
    else if (req.body.params.newFirstname) {
      const user = await User.findOne({username: req.body.params.username})
      await User.updateOne({firstname: user.firstname}, {$set: {firstname: req.body.params.newFirstname}});
      res.send({ msg: "Firstname updated"})
    }
    else if (req.body.params.newLastname) {
      const user = await User.findOne({username: req.body.params.username})
      await User.updateOne({lastname: user.lastname}, {$set: {lastname: req.body.params.newLastname}});
      res.send({ msg: "Lastname updated"})
    }
    else {
      console.log("Invalid")
      throw new Error("Error Update")
    }
  }
  catch (error) {
    console.log(error)
    res.status(418).send({ error: error.message })
  }
}

exports.deleteUser = async (req, res) => {
  try {
  await User.deleteOne({ username: req.body.username })
  res.send({ msg: "delete User" });
}
catch (error) {
  console.log(error);
  res.status(418).send({ err: error });
}
}

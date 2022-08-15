require("dotenv").config();
const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully Connected");
  }
//--------------------------------------
  catch (error) {
    console.log(error);
  }
};

connection();
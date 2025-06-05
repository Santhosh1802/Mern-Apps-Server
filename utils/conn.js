const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function CheckConnection() {
  const uri = process.env.MONGO_URI;
  try {
    const connection = await mongoose.connect(uri);
    if (connection) {
      console.log("Database Connected");
    }
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { CheckConnection };

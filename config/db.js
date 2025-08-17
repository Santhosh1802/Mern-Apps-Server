import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

//method used to check the mongo db connection
export async function checkMongoDbConnection() {
  const DB_URL = process.env.DB_URL;
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Connected to MongoDB Atlas");
    })
    .catch((err) => {
      console.error(err);
    });
}

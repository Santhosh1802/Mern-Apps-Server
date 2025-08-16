import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
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

import express from "express";
import cors from "cors";
import {checkMongoDbConnection} from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import bodyParser from "body-parser";
const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(userRouter);

app.listen(8080,()=>{
    console.log("Server Started");
    checkMongoDbConnection();
})
import express from "express";
import cors from "cors";
import {checkMongoDbConnection} from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import bodyParser from "body-parser";
import notesRouter from "./routes/notesRoute.js";
import { authUser } from "./middlewares/authMiddleware.js";
const app=express();
//app configurations
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//app public routes
app.use(userRouter);
//app middlewares for auth
app.use(authUser);
//app protected routes
app.use(notesRouter);

//server start at port 8080
app.listen(8080,()=>{
    console.log("Server Started");
    checkMongoDbConnection();//chech db connection
})
import express from "express";
import { userGoogleController, userLoginController, userRegisterController } from "../controllers/userController.js";

const userRouter=express.Router();
//Routes of user all are public start with /auth
userRouter.post("/auth/register",userRegisterController);
userRouter.post("/auth/login",userLoginController);
userRouter.post("/auth/google",userGoogleController);

export default userRouter;
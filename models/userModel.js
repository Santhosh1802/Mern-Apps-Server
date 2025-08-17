import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,//user's name
        required:true,
    },
    email:{
        type:String,//user's email
        unique:true,
        required:true,
    },
    password:{
        type:String,//user's password required when using normal login and register
    },
    googleId:{
        type:String,//user's googleId required when using google sign in method
    },

})
const User=mongoose.model("User",userSchema);
export default User;
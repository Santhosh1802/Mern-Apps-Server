import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../utils/tokenUtil.js";
import axios from "axios";
import { status } from "../utils/StatusUtil.js";

//handles normal user registration
export async function RegisterUser(data, response) {
  //check if user already exists
  const user = await User.findOne({ email: data.email });
  //if user exist send error
  if (user) {
    response.setStatus(status.conflict);
    response.pushError("User Already Exist.");
    return;
  } 
  //else proceed with registration process
  else {
    const saltRounds = 12;//salt rounds to encrypt password
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);//encrypting password with bcrypt-js
    const newUser = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
    await newUser.save();//new user creation
    response.setStatus(status.created);
    response.setMessage("User Created Successfully");
    response.setData({ accessToken: await createAccessToken(newUser) });
    return;
  }
}

export async function LoginUser(data, response) {
  const user = await User.findOne({ email: data.email });
  //check if user exists or not
  if (!user) {
    //push error on not found user
    response.pushError("User not registered");
    response.setStatus(status.unauthorized);
    return;
  } else {
    const passwordMatched = await bcrypt.compare(data.password, user.password);//password comparing phase using bcrypt-js
    if (!passwordMatched) {
      //push error if password does not match
      response.pushError("Invalid password");
      response.setStatus(status.unauthorized);
      return;
    } else {
      //if password and email exist and are correct login success
      response.setMessage("Login Successful");
      response.setStatus(status.ok);
      response.setData({ accessToken: await createAccessToken(user) });
      return;
    }
  }
}

export async function GoogleLogin(data, response) {
  const googleRes = await axios.get(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${data.credential}`
  );//google oauth verification process provides data that is from token we pass
  const { email, name, sub } = googleRes.data;
  let user = await User.findOne({ email: email });
  if (!user) {
    user = new User({ name, email, googleId: sub });
    await user.save();
  }
  //if all process are right google login is Success
  response.setMessage("Google Login Success");
  response.setStatus(status.ok);
  response.setData({ accessToken: await createAccessToken(user) });
  return;
}

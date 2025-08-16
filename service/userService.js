import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../utils/tokenUtil.js";
import axios from "axios";

export async function RegisterUser(data, response) {
  const user = await User.findOne({ email: data.email });
  if (user) {
    response.pushError("User Already Exist.");
    return;
  } else {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    const newUser = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
    await newUser.save();
    response.setMessage("User Created Successfully");
    response.setData({ accessToken: await createAccessToken(newUser) });
    return;
  }
}

export async function LoginUser(data, response) {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    response.pushError("User not registered");
    return;
  } else {
    const passwordMatched = await bcrypt.compare(data.password, user.password);
    if (!passwordMatched) {
      response.pushError("Invalid password");
      return;
    } else {
      response.setMessage("Login Successful");
      response.setData({ accessToken: await createAccessToken(user) });
      return;
    }
  }
}

export async function GoogleLogin(data, response) {
  const googleRes = await axios.get(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${data.credential}`
  );
  console.log(googleRes.data);
  const { email, name, picture, sub } = googleRes.data;
  let user = await User.findOne({ email: email });
  if (!user) {
    user = new User({ name, email, googleId: sub, picture });
    await user.save();
  }
  response.setMessage("Google Login Success");
  response.setData({ accessToken: await createAccessToken(user) });
  return;
}

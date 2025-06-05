const User = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

async function SignUpUser(req, res) {
  const response = {
    message: [],
    error: [],
  };
  const { name, email, password } = req.body;
  let validated = false;
  if (name === "") {
    response.error.push("Name is required");
  }
  if (email === "") {
    response.error.push("Email is required");
  }
  if (password === "") {
    response.error.push("Password is required");
  }
  if (name !== "" && email !== "" && password !== "") {
    if (!validator.isEmail(email)) {
      response.error.push("Email not in correct format");
    } else {
      validated = true;
    }
  }
  if (validated) {
    const user = await User.findOne({ email: email });
    if (user) {
      response.error.push("User with email already exists.");
    } else {
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      await newUser.save();
      response.message.push("User created successfully");
    }
  }
  res.json(response);
}

async function LoginUser(req, res) {
  const response = {
    message: [],
    error: [],
  };
  const { email, password } = req.body;
  if (email === "") {
    response.error.push("Email is required");
  }
  if (password === "") {
    response.error.push("Password is required");
  }
  if (email !== "" && password !== "") {
    const user = await User.findOne({ email: email });
    if (!user) {
      response.error.push("User is not registered");
    } else {
      const passwordVerified = await bcrypt.compare(password, user.password);
      if (passwordVerified) {
        const token = jwt.sign({email}, process.env.SECRET, {
          expiresIn:'7d'
        });
        res.cookie("token", token, { maxAge: 7 * 24 * 60 * 60 * 1000 });
        response.message.push("Login Successfully");
      } else {
        response.error.push("Invalid Password");
      }
    }
  }
  res.json(response);
}
module.exports = { SignUpUser, LoginUser };

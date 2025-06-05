const Todo = require("../models/Todo");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function AddTodo(req, res) {
  const response = {
    message: [],
    error: [],
  };
  const { content } = req.body;
  const token = req.headers.cookie.split("=")[1];
  if (content === "") {
    response.error.push("Content is required");
  } else {
    const decoded = await jwt.decode(token, process.env.SECRET);
    const user = await User.findOne({ email: decoded.email });
    const newTodo = new Todo({
      content: content,
      created_by: user._id,
      created_at: new Date(),
    });
    newTodo.save();
    response.message.push("Added Todo");
  }
  res.json(response);
}

async function editTodo(req, res) {
  const response = {
    message: [],
    error: [],
  };
  const { id, content } = req.body;
  console.log(req.body);
  
  if (content === "") {
    response.error.push("Content should not be empty");
  } else {
    const task = await Todo.findByIdAndUpdate(
      { _id: id },
      { $set: { content: content } },
      { new: true }
    );
    if (!task) {
      response.error.push("Update failed");
    } else {
      response.message.push("Updated successfully");
    }
  }
  res.json(response);
}

async function getTodo(req, res) {
  const response = {
    data: [],
  };
  const token = req.headers.cookie.split("=")[1];
  const decoded = await jwt.decode(token, process.env.SECRET);
  const user = await User.findOne({ email: decoded.email });
  const id = user._id;
  const data = await Todo.find({ created_by: id });
  response.data.push(data);
  res.json(response);
}

async function deleteTodo(req, res) {
  const response = {
    message: [],
    error: [],
  };
  const { id } = req.body;
  try {
    const todo = await Todo.findByIdAndDelete({ _id: id });
    response.message.push("Deleted successfully");
  } catch (error) {
    response.error.push("Error Deleting Todo");
  }
  res.json(response);
}

module.exports = { AddTodo, getTodo, editTodo, deleteTodo };

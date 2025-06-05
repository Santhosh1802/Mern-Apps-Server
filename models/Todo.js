const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  created_by: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;

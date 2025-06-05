const {
  AddTodo,
  getTodo,
  editTodo,
  deleteTodo,
} = require("../controllers/TodoController");

const router = require("express").Router();

router.post("/add-todo", AddTodo);
router.get("/get-todo", getTodo);
router.post("/edit-todo", editTodo);
router.post("/delete-Todo", deleteTodo);

module.exports = router;

const express = require("express");
const { body } = require("express-validator");

const todoController = require("../controller/todo");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/all_todos", isAuth, todoController.getAllTodos);

router.post(
  "/create_todo",
  isAuth,
  [
    body("title").trim().isLength({ min: 8 }),
    body("description").trim().isLength({ min: 16 }),
  ],
  todoController.createTodo
);

router.delete("/:todoId", isAuth, todoController.deleteTodo);

router.put("/:todoId", isAuth, todoController.markAsCompletedTod);

router.get("/completed_todos", isAuth, todoController.getCompletedTodos);

module.exports = router;

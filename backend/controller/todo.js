const { validationResult } = require("express-validator");

const Todo = require("../models/todo");
const User = require("../models/user");

exports.getAllTodos = (req, res, next) => {
  Todo.find({ creator: req.userId })
    .sort({ createdAt: -1 })
    .then((todos) => {
      res.status(200).json({
        todos: todos,
        success: true,
        message: "Todo fetched successfully",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      console.log(err);
      next(err);
    });
};

// add todo controller
exports.createTodo = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed, entered data is incorrect.",
      errors: errors.array(),
    });
  }

  const title = req.body.title;
  const description = req.body.description;
  const isCompleted = req.body.isCompleted;
  let creator;

  const todo = new Todo({
    title: title,
    description: description,
    isCompleted: isCompleted,
    creator: req.userId,
  });

  todo
    .save()
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      creator = user;
      console.log(user);
      user.todos.push(todo);
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        todo: todo,
        message: "Todo created successfully",
        success: true,
        creator: { _id: creator._id, name: creator.name },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "Something went wrong", success: false });
    });
};

exports.deleteTodo = (req, res, next) => {
  const todoId = req.params.todoId;

  Todo.findById(todoId)
    .then((todo) => {
      if (!todo) {
        const error = new Error("The todo that you want to delete not found");
        error.statusCode = 404;
        throw error;
      }
      return Todo.findByIdAndRemove(todo._id);
    })
    .then((result) => {
      res
        .status(200)
        .json({ message: "Todo deleted success fully", success: true });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.markAsCompletedTod = (req, res, next) => {
  const todoId = req.params.todoId;

  Todo.findById(todoId)
    .then((todo) => {
      if (!todo) {
        const error = new Error("The todo that you want to delete not found");
        error.statusCode = 404;
        throw error;
      }
      todo.isCompleted = !todo.isCompleted;

      return todo.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Todo marked as completed successfully",
        success: true,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getCompletedTodos = (req, res, next) => {
  Todo.find({ isCompleted: true, creator: req.userId })
    .then((results) => {
      res.status(200).json({
        todos: results,
        success: true,
        message: "Todo fetched successfully",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

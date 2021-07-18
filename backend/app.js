const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");

const todoRoutes = require("./router/todo");
const authRoutes = require("./router/auth");

const app = express();
app.use(helmet());

app.use(express.json()); // application/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to this api it is my first api",
    routes: [
      { method: "GET", routes: "/todo/all_todos" },
      { method: "GET", routes: "/todo/completed_todos" },
      { method: "PUT", routes: "/todo/:id" },
      { method: "PUT", routes: "/todo/:id" },
      { method: "DELETE", routes: "/todo/:id" },
      { method: "POST", routes: "/auth/signup" },
      { method: "POST", routes: "/auth/signin" },
    ],
  });
});
app.use("/todo", todoRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  const emailError = error.emailError;

  if (error.fromAuth) {
    res.status(status).json({
      message: message,
      data: data,
      success: false,
      emailError: emailError,
    });
  } else {
    res.status(status).json({ message: message, data: data, success: false });
  }
});

mongoose
  .connect(
    "mongodb+srv://Mohammad:todo-mongo@cluster0.ly3l3.mongodb.net/mernStackTodo?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    app.listen(process.env.PORT || 8080, () => {
      console.log("server started, connected to the db");
    });
  })
  .catch((err) => {
    console.log(err);
  });

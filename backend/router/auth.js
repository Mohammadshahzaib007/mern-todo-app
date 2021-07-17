const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");
const authControllers = require("../controller/auth");

const route = express.Router();

route.post(
  "/signup",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email.")
      // .custom((value, { req }) => {
      //   console.log(value);
      //   return User.find({ email: value }).then((userDoc) => {
      //     if (userDoc) {
      //       console.log("doc", userDoc);
      //       return Promise.reject("E-mail address already exsits");
      //     }
      //   });
      // })
      .normalizeEmail()
      .toLowerCase(),
    body("password").trim().isLength({ min: 8 }),
    body("name").trim().not().isEmpty(),
  ],
  authControllers.signup
);
route.post("/signin", authControllers.signin);


module.exports = route;

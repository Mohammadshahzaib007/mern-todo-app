const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 201;
    error.data = errors.array();
    error.emailError = errors.array()[0].msg;
    error.fromAuth = true;
    throw error;
  }

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  User.findOne({ email: email })
    .then((user) => {
      console.log(user);
      if (user) {
        const error = new Error("The user with this e-mail alreday exists.");
        error.statusCode = 201;
        throw error;
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({ email: email, password: hashedPw, name: name });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "User created successfully",
        userId: result._id,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.signin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      console.log(user)
      if (!user) {
        const error = new Error("The user with this e-mail does not exists.");
        error.statusCode = 201;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("The enter password is wrong.");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          id: loadedUser._id.toString(),
        },
        "THISISAMOHAMMADSHAHZAIBSECRETFORJWTWEBTOKENS",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        success: true,
        token: token,
        userId: loadedUser._id.toString(),
        name: loadedUser.name,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

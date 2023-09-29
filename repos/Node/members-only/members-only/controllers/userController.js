const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const Message = require("../models/message");
const bcrypt = require("bcryptjs");

exports.index = asyncHandler(async (req, res, next) => {
  const messages = await Message.countDocuments({}).exec();
  // const user = await User.findById(req.params.id).exec();

  // res.render("partials/header", {
  //   user: req.user,
  // });

  res.render("index", {
    title: "Message Board",
    all_messages: messages,
    user: req.user,
  });
});

// Display create user form GET
exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.render("signup", { title: "New User" });
});

// Display create user form POST
exports.user_create_post = [
  body("username").trim().isLength({ min: 1 }).escape(),
  body("password").trim().isLength({ min: 1 }).escape(),
  body("confirmPassword").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const existingUser = await User.find({ username: req.body.username });
    if (existingUser.length > 0)
      return res.render("signup", {
        title: "New User",
        user: user,
        errors: "Username already exists",
      });

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) return next(err);
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        member_status: false,
      }).save((err) => (err ? next(err) : res.redirect("/")));
    });

    // if (req.body.password !== req.body.confirmPassword) {
    //   res.render("signup", {
    //     title: "New User",
    //     user: user,
    //     errors: "Passwords do not match",
    //   });
    // }

    if (!errors.isEmpty()) {
      res.render("signup", {
        title: "New User",
        user: user,
        errors: errors.array(),
      });
      return;
    } else {
      await user.save();
      res.redirect("/");
    }
  }),
];

// Handle user login GET
exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.render("login", { title: "Login" });
});

// Handle user login POST
exports.user_login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

//Handle user logout GET
exports.user_logout_get = (req, res) => {
  req.logout();
  res.redirect("/");
};

// exports.user_logout_get = asyncHandler(async (req, res, next) => {
//   req.logout();
//   res.redirect("/");
// });

// Handle user update GET
exports.user_update_get = asyncHandler(async (req, res, next) => {
  res.send();
});

// Handle user update POST
exports.user_update_post = asyncHandler(async (req, res, next) => {
  res.send();
});

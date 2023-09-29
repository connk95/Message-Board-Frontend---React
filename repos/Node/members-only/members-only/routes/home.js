const express = require("express");
const router = express.Router();

const message_controller = require("../controllers/messageController");
const user_controller = require("../controllers/userController");

router.get("/", user_controller.index);

router.get("/create", user_controller.user_create_get);

router.post("/create", user_controller.user_create_post);

router.get("/login", user_controller.user_login_get);

router.post("/login", user_controller.user_login_post);

router.get("/logout", user_controller.user_logout_get);

module.exports = router;

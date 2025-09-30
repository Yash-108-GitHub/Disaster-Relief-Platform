const express = require("express");
const router = express.Router();
//controller
const userController = require("../controllers/user.js");
const passport = require("passport");

const { isLoggedIn } = require("../middleware.js");
// we have the sign up / login form in root route , so we need to define get route for sign up before post route and hence in this is redirected to root route.
router.route("/signup")
  .get(userController.renderSignupForm)
  .post(userController.signup);


router.route("/login")
  .get(userController.renderLoginForm)
  .post(userController.login);

module.exports = router;
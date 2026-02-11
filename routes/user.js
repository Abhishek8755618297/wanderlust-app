const express = require("express");
const router = express.Router(); 
//const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

//signup
router.route("/signup")
.get(userController.renderSignUpform ) // signUp => GET and POST
.post(wrapAsync(userController.signup));


//login
router.route("/login")
.get(userController.renderLoginForm) // login => GET and POST
.post(saveRedirectUrl, passport.authenticate("local", { 
    failureRedirect: "/login", 
    failureFlash: true,
 }),
   userController.login
);


//logout
router.get("/logout", userController.logout);


module.exports = router;
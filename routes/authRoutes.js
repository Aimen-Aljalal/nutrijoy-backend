const express = require("express");
const { body } = require("express-validator");
const authController = require("../controller/authController");

const router = express.Router();

router.post(
  "/signup",
  [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required.")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters."),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters."),
    body("age")
      .isInt({ min: 10, max: 100 })
      .withMessage("Age must be between 10 and 100."),
    body("gender")
      .isIn(["male", "female"])
      .withMessage("Gender must be male or female."),
    body("height_cm")
      .isFloat({ min: 100, max: 250 })
      .withMessage("Height must be between 100 and 250 cm."),
    body("weight_kg")
      .isFloat({ min: 30, max: 300 })
      .withMessage("Weight must be between 30 and 300 kg."),
    body("activity_level")
      .isIn(["sedentary", "moderate", "active"])
      .withMessage("Invalid activity level."),
    body("goal")
      .isIn(["lose weight", "gain weight", "maintain weight"])
      .withMessage("Invalid goal."),
  ],
  authController.signup
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required."),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  authController.login
);



module.exports = router;

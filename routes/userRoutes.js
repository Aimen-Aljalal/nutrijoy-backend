const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const userController = require("../controller/userController");

router.get("/profile", isAuth, userController.getProfile);

router.put("/profile", isAuth, userController.updateProfile);

module.exports = router;

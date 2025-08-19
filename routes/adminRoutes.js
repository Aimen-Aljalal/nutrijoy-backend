const express = require("express");
const router = express.Router();

const AdminController = require("../controller/adminController");

const protectAdmin = require("../middleware/authMiddleware");


router.get("/users", protectAdmin, AdminController.getAllUsers);

module.exports = router;

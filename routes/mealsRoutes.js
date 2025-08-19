const express = require("express");
const router = express.Router();

const MealsController = require("../controller/mealsController");
const protectAdmin = require("../middleware/authMiddleware");
const isAuth = require("../middleware/isAuth");

router.get("/getAllMeals", protectAdmin, MealsController.getAllMeals);

router.post("/addMeal", protectAdmin, MealsController.addMeal);

router.put("/updateMeal/:id", protectAdmin, MealsController.updateMeal);

router.delete("/deleteMeal/:id", protectAdmin, MealsController.deleteMeal);

router.get("/getMeal/:id", protectAdmin, MealsController.getMealById);

router.get("/MealPlaning", isAuth, MealsController.getAllMeals);

module.exports = router;

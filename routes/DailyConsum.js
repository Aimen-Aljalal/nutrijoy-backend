const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const DailyConsumptionController = require("../controller/DailyConsumController")

router.post("/add", isAuth, DailyConsumptionController.add);
router.get("/today", isAuth, DailyConsumptionController.today);
router.delete("/delete/:mealId", isAuth, DailyConsumptionController.deleteMeal);
router.patch("/finalize", isAuth, DailyConsumptionController.finalizeDay);

router.get("/history", isAuth, DailyConsumptionController.history);


module.exports = router;

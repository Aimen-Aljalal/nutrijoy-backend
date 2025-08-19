const DailyConsumption = require("../models/DailyConsumption");

exports.add = async (req, res, next) => {
  try {
    const { mealId, customName, quantity, calories } = req.body;
    const userId = req.user.id;
    const today = new Date().setHours(0, 0, 0, 0);

    let record = await DailyConsumption.findOne({ userId, date: today });

    if (!record) {
      record = new DailyConsumption({
        userId,
        date: today,
        meals: [],
        totalCalories: 0,
      });
    }

    record.meals.push({
      mealId: mealId || null,
      customName: mealId ? null : customName, 
      quantity,
      calories,
    });

    record.totalCalories += calories;

    await record.save();

    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.today = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const today = new Date().setHours(0, 0, 0, 0);

    const record = await DailyConsumption.findOne({ userId, date: today })
      .populate("meals.mealId");

    if (record) {
      const meals = record.meals.map(m => ({
        _id: m._id,
        name: m.mealId ? m.mealId.name : m.customName,
        quantity: m.quantity,
        calories: m.calories,
      }));

      return res.json({
        meals,
        totalCalories: record.totalCalories,
      });
    }

    res.json({ meals: [], totalCalories: 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMeal = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const mealId = req.params.mealId;
    const today = new Date().setHours(0, 0, 0, 0);

    const record = await DailyConsumption.findOne({ userId, date: today });
    if (!record) return res.status(404).json({ error: "No daily record found" });

    const mealIndex = record.meals.findIndex(m => m._id.toString() === mealId);
    if (mealIndex === -1) return res.status(404).json({ error: "Meal not found" });

    record.totalCalories -= record.meals[mealIndex].calories;

    record.meals.splice(mealIndex, 1);

    await record.save();

    res.json({ message: "Meal deleted successfully", meals: record.meals });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.finalizeDay = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date().setHours(0, 0, 0, 0);

    const record = await DailyConsumption.findOne({ userId, date: today });
    if (!record) return res.status(404).json({ error: "No daily record found" });

    record.isFinalized = true;
    await record.save();

    res.json({ message: "Day finalized successfully", record });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.history = async (req, res) => {
  try {
    const userId = req.user.id;
    const records = await DailyConsumption.find({ userId, isFinalized: true })
      .sort({ date: -1 })
      .populate("meals.mealId"); 

    const formattedRecords = records.map(record => ({
      _id: record._id,
      date: record.date,
      totalCalories: record.totalCalories,
      meals: record.meals.map(m => ({
        _id: m._id,
        name: m.mealId ? m.mealId.name : m.customName,
        quantity: m.quantity,
        calories: m.calories,
      })),
    }));

    res.json(formattedRecords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

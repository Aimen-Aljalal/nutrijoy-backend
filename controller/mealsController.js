const Meals = require("../models/Meal");

exports.getAllMeals = async (req, res, next) => {
  try {
    const meals = await Meals.find();
    if (meals.length === 0) {
      return res
        .status(200)
        .json({ message: "No meals found yet.", meals: [] });
    }
    res.status(200).json(meals);
  } catch (error) {
    next(error);
  }
};

exports.addMeal = async (req, res, next) => {
  try {
    const { 
      name, 
      category, 
      baseQuantityValue, 
      baseQuantityUnit, 
      caloriesPerBase, 
      imageUrl 
    } = req.body;

    // تحقق من الحقول المطلوبة
    if (!name || !category || !baseQuantityValue || !baseQuantityUnit || !caloriesPerBase) {
      return res
        .status(400)
        .json({ message: "Name, category, base quantity, unit, and calories are required." });
    }

    // تحقق من صحة القيمة في category
    const validCategories = [
      "fried",        // مقليات
      "baked",        // مخبوزات
      "legumes",      // بقوليات
      "snacks",       // وجبات خفيفة
      "desserts",     // حلويات
      "grilled",      // مشويات
      "salads",       // سلطات
      "soups",        // شوربات
      "beverages",    // مشروبات
      "others"        // أخرى
    ];

    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category." });
    }

    // إنشاء الوجبة الجديدة
    const newMeal = new Meals({
      name: name.trim(),
      category,
      baseQuantityValue: Number(baseQuantityValue),
      baseQuantityUnit: baseQuantityUnit.trim(),
      caloriesPerBase: Number(caloriesPerBase),
      imageUrl: imageUrl ? imageUrl.trim() : "",
    });

    // حفظ الوجبة في قاعدة البيانات
    const savedMeal = await newMeal.save();

    res
      .status(201)
      .json({ message: "Meal added successfully.", meal: savedMeal });
  } catch (error) {
    next(error);
  }
};



exports.updateMeal = async (req, res, next) => {
  try {
  const { id } = req.params;
  const { name, category, baseQuantityValue, baseQuantityUnit, caloriesPerBase, imageUrl } = req.body;

    // تحقق من وجود الوجبة
    const meal = await Meals.findById(id);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found." });
    }

    // تحديث الحقول المطلوبة
  if (name) meal.name = name.trim();
  if (category) meal.category = category;
  if (baseQuantityValue !== undefined) meal.baseQuantityValue = Number(baseQuantityValue);
  if (baseQuantityUnit) meal.baseQuantityUnit = baseQuantityUnit.trim();
  if (caloriesPerBase !== undefined) meal.caloriesPerBase = Number(caloriesPerBase);
  if (imageUrl) meal.imageUrl = imageUrl.trim();

    // حفظ التحديثات
    const updatedMeal = await meal.save();

    res.status(200).json({ message: "Meal updated successfully.", meal: updatedMeal });
  } catch (error) {
    next(error);
  }
};

exports.deleteMeal = async (req, res, next) => {
  try {
    const { id } = req.params;

    // تحقق من وجود الوجبة
    const meal = await Meals.findById(id);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found." });
    }

    // حذف الوجبة
    await Meals.findByIdAndDelete(id);

    res.status(200).json({ message: "Meal deleted successfully." });
  } catch (error) {
    next(error);
  }
}

exports.getMealById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const meal = await Meals.findById(id);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found." });
    }

    res.status(200).json(meal);
  } catch (error) {
    next(error);
  }
}
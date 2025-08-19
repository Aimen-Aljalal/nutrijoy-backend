const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "fried",
        "baked",
        "legumes",
        "snacks",
        "desserts",
        "grilled",
        "salads",
        "soups",
        "beverages",
        "others"
      ],
      required: true,
    },

    baseQuantityValue: {
      type: Number, 
      required: true,
    },

    baseQuantityUnit: {
      type: String, 
      required: true,
    },

    caloriesPerBase: {
      type: Number, 
      required: true,
    },

    imageUrl: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meal", mealSchema);

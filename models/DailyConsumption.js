const mongoose = require("mongoose");

const DailyConsumptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: () => new Date().setHours(0, 0, 0, 0),
  }, 
  meals: [
    {
      mealId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meal",
        required: false,
      },
      customName: {
        type: String,
        required: false,
        trim: true,
      }, 
      quantity: {
        type: Number,
        required: true,
      },
      calories: {
        type: Number,
        required: true,
      },
    },
  ],
  totalCalories: {
    type: Number,
    default: 0,
  },
  isFinalized: { type: Boolean, default: false },
});

module.exports = mongoose.model("DailyConsumption", DailyConsumptionSchema);

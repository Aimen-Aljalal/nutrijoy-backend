const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  age: { type: Number, required: true, min: 10, max: 100 },
  gender: { type: String, enum: ["male", "female"], required: true },
  height_cm: { type: Number, required: true, min: 100, max: 250 },
  weight_kg: { type: Number, required: true, min: 30, max: 300 },
  activity_level: {
    type: String,
    enum: ["sedentary", "moderate", "active"],
    required: true,
  },
  goal: {
    type: String,
    enum: ["lose weight", "gain weight", "maintain weight"],
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

const User = require("../models/User");

function calculateIdealWeight(height_cm, gender) {
  if (gender === "male") {
    return height_cm - 100;
  } else if (gender === "female") {
    return (height_cm - 100) * 0.9;
  }
  return null;
}

function calculateBMI(weight_kg, height_cm) {
  const height_m = height_cm / 100;
  const bmi = weight_kg / (height_m * height_m);
  let category = "";

  if (bmi < 18.5) category = "underweight";
  else if (bmi < 25) category = "normal";
  else if (bmi < 30) category = "overweight";
  else category = "obese";

  return { bmi: bmi.toFixed(1), category };
}

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const idealWeight = calculateIdealWeight(user.height_cm, user.gender);
    const { bmi, category } = calculateBMI(user.weight_kg, user.height_cm);

    res.status(200).json({
      ...user.toObject(),
      idealWeight,
      bmi,
      bmiCategory: category,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const allowedFields = ["username", "email", "weight_kg", "age" , "height_cm"];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const idealWeight = calculateIdealWeight(user.height_cm, user.gender);
    const { bmi, category } = calculateBMI(user.weight_kg, user.height_cm);

    res.status(200).json({
      message: "Profile updated successfully.",
      user: {
        ...user.toObject(),
        idealWeight,
        bmi,
        bmiCategory: category,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

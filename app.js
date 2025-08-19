const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const app = express();

app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "OPTIONS", "DELETE", "PATCH"],
  })
);
app.options("*", cors());

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const MealsRoutes = require("./routes/mealsRoutes");
const DailyConsumRoutes = require("./routes/DailyConsum")
const server = http.createServer(app);

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|avif|webp/;
  const extname = allowed.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowed.test(file.mimetype);
  if (extname && mimetype) cb(null, true);
  else cb(new Error("Only images (jpeg/jpg/png) are allowed"));
};

const upload = multer({ storage, fileFilter });

app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

app.use("/uploads", express.static(uploadDir));

app.use(express.json());



app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/meals", MealsRoutes);
app.use("/api/dailyConsumption", DailyConsumRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  const status = error.statusCode || 500;
  const message = error.message || "There is an error";
  res.status(status).json({ message });
});

const URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 4444;


mongoose
  .connect(URI)
  .then(() => {
    console.log("MongoDB connected.");
    const server = http.createServer(app);
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

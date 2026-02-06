const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log(
      "🔍 MONGO_URI:",
      process.env.MONGO_URI ? "FOUND" : "MISSING"
    );

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

module.exports = connectDB;

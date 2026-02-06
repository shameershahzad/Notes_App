const express = require("express");
const connectDB = require("./config/db");
const accountRoutes = require("./routes/accountRoutes");
const notesRoutes = require("./routes/notesRoutes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("Backend working on Vercel ✅");
});

app.get("/db-check", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({
      mongoUriLoaded: !!process.env.MONGO_URI,
      dbConnected: true
    });
  } catch (error) {
    res.json({
      mongoUriLoaded: !!process.env.MONGO_URI,
      dbConnected: false,
      error: error.message
    });
  }
});

app.use("/account", accountRoutes);
app.use("/notes", notesRoutes);

module.exports = app;  

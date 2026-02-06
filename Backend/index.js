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

app.get("/db-check", (req, res) => {
  res.json({
    mongoUriLoaded: !!process.env.MONGO_URI
  });
});

app.use("/account", accountRoutes);
app.use("/notes", notesRoutes);

module.exports = app;  

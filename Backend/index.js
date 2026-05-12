require('dotenv').config(); // Must be first line

const express = require('express');
const accountRoutes = require("./routes/accountRoutes");
const notesRoutes = require("./routes/notesRoutes");
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use("/account", accountRoutes);
app.use("/notes", notesRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Notes App API is running!" });
});

// Export for Vercel (serverless) - do NOT call app.listen() for production
module.exports = app;

// Only listen locally when running with node/nodemon directly
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
  });
}
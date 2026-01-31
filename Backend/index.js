const express = require('express');
const accountRoutes = require("../routes/accountRoutes");
const notesRoutes = require("../routes/notesRoutes");
const connectDB = require("../config/db");
const cors = require("cors");

connectDB();

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Backend working on Vercel ✅");
});

app.use("/account", accountRoutes);
app.use("/notes", notesRoutes);

module.exports = app;   

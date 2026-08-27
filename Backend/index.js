require('dotenv').config(); // Must be first line

const express = require('express');
const accountRoutes = require("./routes/accountRoutes");
const notesRoutes = require("./routes/notesRoutes");
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();

const app = express();
app.use(express.json());

const defaultOrigins = [
  "http://localhost:5173",
  "https://full-stack-notes-application.netlify.app",
];
const envOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((url) => url.trim().replace(/\/$/, ""))
  .filter(Boolean);
const allowedOrigins = [...new Set([...defaultOrigins, ...envOrigins])];

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (no Origin header) and any listed origin
    if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
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
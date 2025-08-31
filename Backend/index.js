const express = require('express');
const accountRoutes = require("./routes/accountRoutes")
const notesRoutes = require("./routes/notesRoutes")
const connectDB = require("./config/db")
const cors  = require("cors")

connectDB()

const app = express();  
app.use(express.json())
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use("/account",accountRoutes)
app.use("/notes",notesRoutes)

app.use("/",(req,res) => {
  res.send("Backend is running")
})
const port = 3001;

app.listen(port,() => {
    console.log(`Server is running at port: ${port}`)
})
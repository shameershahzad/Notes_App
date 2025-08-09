const mongoose = require("mongoose")
require('dotenv').config();

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("Error:", err))
}

module.exports = connectDB;
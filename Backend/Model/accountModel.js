const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
   name:String,
   email:String,
   password:String,
})

const accountModel = mongoose.model("NotesAccount",accountSchema);
module.exports = accountModel
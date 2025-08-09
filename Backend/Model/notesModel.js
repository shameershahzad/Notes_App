const mongoose = require("mongoose")

const notesSchema = new mongoose.Schema({
    title: String,
    body: String,
    tag:String,
    userId:String
})

const notesModel = mongoose.model("Notes",notesSchema)
module.exports = notesModel;
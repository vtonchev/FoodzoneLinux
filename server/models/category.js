const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title: {type: String, unique: true, require: true},
    photo: {
        url:String,
        key:String
    }
})

module.exports = mongoose.model("Category", categorySchema);
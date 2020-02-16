const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    type: {type: String, unique: true, require: true},
    photo: {type: String}
})

module.exports = mongoose.model("Category", categorySchema);
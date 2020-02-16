const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
    type: {type: String, unique: true, require: true},
    category: {type: Schema.Types.ObjectId, ref:"Category"},
})

module.exports = mongoose.model("Subcategory", subcategorySchema);
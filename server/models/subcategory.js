const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
    category: {type: Schema.Types.ObjectId, ref:"Category"},
    title: { type: String, unique: true, require: true },
})

module.exports = mongoose.model("Subcategory", subcategorySchema);
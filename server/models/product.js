const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    category: {type: Schema.Types.ObjectId, ref:"Category"},
    subcategory: {type: Schema.Types.ObjectId, ref:"Subcategory"},
    title: String,
    description: String,
    photo: {
        url: String,
        key: String
    },
    price: mongoose.Decimal128,
    weight: mongoose.Decimal128,
    stockQuantity: Number,
    rating: [Number]
})

module.exports = mongoose.model("Product", productSchema);
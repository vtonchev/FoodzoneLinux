const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    seq: Number,
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
    rating: [Number],
    properties: {
        ingredients: String,
        storageConditions: String,
        consumtionWay: String,
        manufacturer: String,
        calories: String,
        carbohydrates: String,
        sugars: String,
        fats: String,
        saturated: String,
        proteins: String,
        salt: String,
        fibers: String,
        expirationDate: Date,
        brand: String,
        origin: String
    }
})

module.exports = mongoose.model("Product", productSchema);
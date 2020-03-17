const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    category: {type: Schema.Types.ObjectId, ref:"Category"},
    subcategory: {type: Schema.Types.ObjectId, ref:"Subcategory"},
    title: String,
    description: {type: Schema.Types.Mixed},
    photo: {
        url: String,
        key: String
    },
    sale: {type: Schema.Types.Mixed},
    oldPrice: {type: Schema.Types.Mixed},
    price: mongoose.Decimal128,
    weight: mongoose.Decimal128,
    unit: String,
    stockQuantity: Number,
    rating: [Number],
    properties:  {}, 
}, { minimize: true })

productSchema.index({ price: 1});

module.exports = mongoose.model("Product", productSchema);

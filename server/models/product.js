const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    category: {type: Schema.Types.ObjectId, ref:"Category"},
    subcategory: {type: Schema.Types.ObjectId, ref:"Subcategory"},
    title: String,
    productID: Number,
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
    stockQuantity: {type:Number, minimum:0},
    rating: [Number],
    suggested: {type:Boolean, default: false},
    bought: {type:Number, default:0},
    properties:  {}, 
}, { minimize: true })

productSchema.index({ price: 1});
productSchema.index({ title: 'text' });
module.exports = mongoose.model("Product", productSchema);

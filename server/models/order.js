const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
     
}, { minimize: true })

module.exports = mongoose.model("Order", orderSchema);
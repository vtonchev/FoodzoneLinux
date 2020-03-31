const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderDateTimeSchema = new Schema({
     date: String,
     dayOfWeek: String,
     timeframe:[{
          to:'String',
          from:'String',
          orders: Number,
          max: Number
     }],
})

module.exports = mongoose.model("OrderDateTime", orderDateTimeSchema);
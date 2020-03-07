const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderDateTimeSchema = new Schema({
     date: String,
     dayOfWeek: String,
     timeframe:[],
})

module.exports = mongoose.model("OrderDateTime", orderDateTimeSchema);
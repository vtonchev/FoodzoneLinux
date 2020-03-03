const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timespanSchema = new Schema({
     date: Date,
     timespan:[],
})

module.exports = mongoose.model("Timespan", timespanSchema);
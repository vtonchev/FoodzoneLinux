const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:"User"},
    city: String,
    housingArea: String,
    street: String,
    outsideDoor: String,
    floor: Number,
    apartment: Number,
});

module.exports = mongoose.model("Address", addressSchema);

    

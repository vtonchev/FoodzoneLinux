const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
     user: {type: Schema.Types.ObjectId, ref:'User'},
     address:{},
     contact:{},
     additionalInfo:{},
     orderDateTime:{},
     paymentMethod:{},
     status: String,
     products:[
          {
               product: {type: Schema.Types.ObjectId, ref:'Product'},
               quantity: Number,
          } 
     ], 
})

module.exports = mongoose.model("Order", orderSchema);
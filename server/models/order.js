const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
     address:{},
     contact:{},
     additionalInfo:{},
     orderDateTime:{},
     paymentMethod:{},
     products:[
          {
               productId: {type: Schema.Types.ObjectId, ref:'Product'},
               quantity: Number,
               price: Number
          } 
     ], 
})

module.exports = mongoose.model("Order", orderSchema);
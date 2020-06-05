const Order = require('../models/order');
const OrderDateTime = require('../models/orderDateTime')
const mongoose = require('mongoose'); // needed for transactions
const Product = require('../models/product');

//async forEach function
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}
// POST request - create Order
exports.create_Order = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        let cart = req.body.cart;
        let newOrder = new Order({
            address: req.body.address,
            contact: req.body.contact,
            additionalInfo: req.body.additionalInfo,
            orderDateTime: req.body.orderDateTime,
            paymentMethod: req.body.paymentMethod,
            status: 'неизпълнена'
        })
        if(req.body.userID){
            newOrder.user = req.body.userID;
        }
        await cart.map(product => {
            newOrder.products.push({
                product: product._id,
                quantity:parseInt(product.quantity),
            })
        })  
        // Save the new order 
        await newOrder.save({ session }),
        // Increment orders per timeframe (+1)
        await OrderDateTime.updateOne(
            { date: req.body.orderDateTime.date, "timeframe.from" : req.body.orderDateTime.timeframe },
            { $inc: { "timeframe.$.orders": 1}},
            { session }     
        ),
        // Increment bought index and decrement stockQuantity
        await asyncForEach(newOrder.products, async (product) => {
            await Product.updateOne(
                { _id: product.product},
                { $inc: { bought: parseInt(product.quantity), stockQuantity: -parseInt(product.quantity) }},
                { session }
            )
        })
        await session.commitTransaction();
        res.json({
            status: true,
            message: "Вашата поръчка беше успешна"
        })
    } catch (err) {
        console.log(err)
        await session.abortTransaction();
        res.status(500).json({
            success:false,
            message: err.message
        })
    } finally {
        session.endSession();
        
    }
}
exports.get_Orders_By_Timeframe = async (req, res) => {
    try {
        let orders = []
        if(req.params.time != 'all'){
            orders = await Order.find( 
                { 
                    $and: [ 
                        { "orderDateTime.date": req.params.date }, 
                        { "orderDateTime.timeframe": req.params.time } 
                    ] 
                } 
            )
            .populate('products.product').exec(); 
        } else {
            orders = await Order.find({"orderDateTime.date" : req.params.date})
            .populate('products.product').exec();  
        }
        res.json({
            success:true,
            orders: orders,
        }); 
    } catch (err) {
        res.status(500).json({
            success:false,
            message: err.message 
        })
    }
}
exports.update_Order = async (req, res) => {
    try {
        await Order.updateOne(
            {_id:req.params.id},
            {
                $set: req.body
            }
        )
        res.json({
            success: true, 
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            success:false,
            message: err.message 
        })
    }
}
exports.get_Orders_By_User = async (req, res) => {
    try {
        const orders = await Order.find(
            {user:req.decoded._id},
        ).populate('products.product').exec(); 
        res.json({
            success: true,
            orders: orders, 
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            success:false,
            message: err.message 
        })
    }
}
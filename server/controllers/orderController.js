const Order = require('../models/order');
const OrderDateTime = require('../models/orderDateTime')

exports.create_Order = async (req, res) => {
    try {
        const cart = req.body.cart;
        const newOrder = new Order({
            address: req.body.address,
            contact: req.body.contact,
            additionalInfo: req.body.additionalInfo,
            orderDateTime: req.body.orderDateTime,
            paymentMethod: req.body.paymentMethod,
        })
        cart.map(product => {
            newOrder.products.push({
                productId: product._id,
                quantity:parseInt(product.quantity),
            })
        })
        await newOrder.save();
        await OrderDateTime.updateOne(
            { date: req.body.orderDateTime.date, "timeframe.from" : req.body.orderDateTime.timeframe },
            {$inc: { "timeframe.$.orders": 1}}      
        )
        res.json({
            success: true,
            message: "Вашата поръчка беше успешна"
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}

exports.get_Orders = async (req, res) => {
    try {
        const orders = await Order.findMany(
            {"orderDateTime.date" : req.params.id}
        );  
        res.json({
            success:false,
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
        
    } catch (err) {
        
    }
}
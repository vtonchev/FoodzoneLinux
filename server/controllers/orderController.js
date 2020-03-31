const Order = require('../models/order');
const OrderDateTime = require('../models/orderDateTime')
// const Product = require('../models/product');
exports.create_Order = async (req, res) => {
    try {
        let cart = req.body.cart;
        const newOrder = new Order({
            user: req.body.userID,
            address: req.body.address,
            contact: req.body.contact,
            additionalInfo: req.body.additionalInfo,
            orderDateTime: req.body.orderDateTime,
            paymentMethod: req.body.paymentMethod,
            status: 'неизпълнена'
        })
        cart.map(product => {
            newOrder.products.push({
                product: product._id,
                quantity:parseInt(product.quantity),
            })
        })  
        const queries = [
            newOrder.save(),
            OrderDateTime.updateOne(
                { date: req.body.orderDateTime.date, "timeframe.from" : req.body.orderDateTime.timeframe },
                {$inc: { "timeframe.$.orders": 1}}      
            ),

        ]
        Promise.all(queries).then(() => {
            res.json({
                status: true,
                message: "Вашата поръчка беше успешна"
            });
        }).catch((err) => {
            res.status(500).json({
                status: false,
                message: err.message
            })
        });
        // newOrder.products.forEach(product => {
        //     Product.updateOne(
        //         {_id: product._id},
        //         {$inc: { bought: 1}}
        //     ) 
        // });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success:false,
            message: err.message
        })
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
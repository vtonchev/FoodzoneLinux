const OrderDateTime = require('../models/orderDateTime');
const moment = require('moment');
require('moment/locale/bg');

//Create days
exports.create_orderDate_7days_Ahead = async (req, res) => {
    try {
        for(i = 0; i <= 7; i++){
            const newOrderDateTime = new OrderDateTime({
                date: moment().add(i,'days').format('DD-MM-YYYY'),
                dayOfWeek: moment().add(i,'days').format('dddd')
            })
            await newOrderDateTime.save();
        }
        res.json({
            success: true,
            message: "Успешно създадохте датите"
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}

// Create a new timeframe
exports.create_Timeframe = async( req, res) => {
    try {
        if(req.body.dayOfWeek==false){
            await OrderDateTime.updateMany(
                {
                    $push: {
                        timeframe: {
                            $each: [ 
                                { 
                                    from: req.body.from,
                                    to: req.body.to,
                                    orders: 0,
                                    max: req.body.max || process.env.MAX_ORDERS
                                }
                            ],
                            $sort: { from: 1 }
                        }
                    }
                    
                }
            )
        } else {
            await OrderDateTime.updateMany( 
                {dayOfWeek: req.body.dayOfWeek},
                {
                    $push: {
                        timeframe: {
                            $each: [ 
                                { 
                                    from: req.body.from,
                                    to: req.body.to,
                                    orders: 0,
                                    max: req.body.max || process.env.MAX_ORDERS
                                }
                            ],
                            $sort: { from: 1 }
                        }
                    }  
                }
            )
        }      
        res.json({
            success: true,
            message: "Успешно създадохте датите"
        });
    } catch (err) {
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}

//add new Days and set 
exports.update_Days = async (req, res) => {
    try {
        const alldays = await OrderDateTime.find().sort({ _id: -1 });
        const firstDay = await OrderDateTime.findOne();
        const lastDay = alldays[0];
        const sameWeekDay = await OrderDateTime.findOne({dayOfWeek: moment(lastDay.date, 'DD-MM-YYYY').add(1,'days').format('dddd')});
        console.log(sameWeekDay)
        const newOrderDateTime = new OrderDateTime({
            date: moment(lastDay.date, 'DD-MM-YYYY').add(1,'days').format('DD-MM-YYYY'),
            dayOfWeek: moment(lastDay.date, 'DD-MM-YYYY').add(1,'days').format('dddd'),
            timeframe: sameWeekDay.timeframe
        })
        console.log(newOrderDateTime)
        const queries = [
            OrderDateTime.deleteOne(firstDay),
            newOrderDateTime.save(),
            OrderDateTime.findOneAndUpdate({date: newOrderDateTime.date},
                {
                    $set:
                        {
                            "timeframe.$.orders" : 0,
                            "timeframe.$.max" : process.env.MAX_ORDERS,
                        } 
                }
            )
        ];
        
        Promise.all(queries).then(() => {
            res.json({
                success: true,
                message: "Успешно създадохте датите"
            });
        }).catch((err) => {
            res.status(500).json({
                status: false,
                message: err.message
            })
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
    
}

//Update max properties of specific timeframes 
exports.update_Max_Property = async (req, res) => {
    try {
        if(req.body.allSelected){ 
            await OrderDateTime.updateMany(
                {date : req.body.date},
                {
                    $set: 
                    { 
                        "timeframe.$[].max": req.body.max
                    } 
                }
            )
            console.log("whyyy")
        } else {
            for(i = 0; i < req.body.selectedTimeframe.length; i++){
                await OrderDateTime.updateOne(
                        {date : req.body.date , "timeframe.from" : req.body.selectedTimeframe[i].from },
                        { $set: { "timeframe.$.max": req.body.max } }
                    )
                }
        }
        res.json({
            success: true,
            message: 'Успешно'
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
    
}

//Send ALL DOCS
exports.send_Date_Timeframes = async (req,res) =>{
    try{
        const orderDateTime = await OrderDateTime.find({});
        res.json({
            success: true,
            orderDateTime: orderDateTime
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

//Check if timeframe is available before order
exports.send_Specific_Timeframe = async (req, res) => {
    try {
        const timeframe = await OrderDateTime.findOne(
            { date: req.params.date},
            { _id: 0, timeframe: { $elemMatch: { from: req.params.from } } }     
        )
        res.json({
            success: true,
            timeframe: timeframe.timeframe[0]
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// Send first available Timeframe
exports.send_Available_Timeframe = async (req, res) => {
    try {
        const timeframe = await OrderDateTime.aggregate([
            {$unwind : "$timeframe"},
            {
                $match:
                {
                    $expr:{$lt:["$timeframe.orders", "$timeframe.max"]}
                },
            },    
        ])
        res.json({
            success: true,
            from: timeframe[0].timeframe.from
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
    
}


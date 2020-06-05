const OrderDateTime = require('../models/orderDateTime');
const mongoose = require('mongoose'); // needed for transactions
const moment = require('moment');
require('moment/locale/bg');

//Create days
exports.create_orderDate_7days_Ahead = async (req, res) => {
    try {
        let orderDateTimes = []
        for(i = 0; i <= 7; i++)
        {
            const currentTime = moment().add(i,'days');
            orderDateTimes.push(
                {
                    UTC: currentTime.format("YYYY-MM-DD"),
                    date: currentTime.format('DD-MM-YYYY'),
                    dayOfWeek: currentTime.format('dddd')
                })
        }
        await OrderDateTime.insertMany(orderDateTimes);
        res.json({
            success: true,
            message: "Успешно създадохте датите"
        });

    } catch (err) {
        consol.log(err)
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
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const firstDay = await OrderDateTime.find({}).sort({ UTC: 1 }).limit(1);
        const lastDay = await OrderDateTime.find({}).sort({ UTC: -1 }).limit(1);
        const nextDay = moment(lastDay[0].date, 'DD-MM-YYYY').add(1,'d');
        const sameWeekDay = await OrderDateTime.findOne({dayOfWeek: nextDay.format('dddd')});
        
        newOrderDateTime = new OrderDateTime({
            UTC: nextDay.format('YYYY-MM-DD'),
            date: nextDay.format('DD-MM-YYYY'),
            dayOfWeek: nextDay.format('dddd'),
            timeframe: sameWeekDay.timeframe 
        })

        await OrderDateTime.deleteOne({date: firstDay[0].date},{session}),
        await newOrderDateTime.save({session}),
        await OrderDateTime.updateOne({date: newOrderDateTime.date},
                {
                    $set:
                        {
                            "timeframe.$[].orders" : 0,
                            "timeframe.$[].max" : process.env.MAX_ORDERS,
                        } 
                },
                {session}
            )
        await session.commitTransaction();
        res.json({
            success: true,
            message: "Успешно създадохте датите"
        });
    } catch (err) {
        console.log(err)
        await session.abortTransaction();
        res.status(500).json({
            success:false,
            message: err.message
        })
    } finally {
    	// ending the session
    	session.endSession();
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
        } else {
            const session = await mongoose.startSession();
            session.startTransaction();
            try {
                for(i = 0; i < req.body.selectedTimeframe.length; i++){
                    await OrderDateTime.updateOne(
                        { date : req.body.date , "timeframe.from" : req.body.selectedTimeframe[i].from },
                        { $set: { "timeframe.$.max": req.body.max } },
                        { session }
                    )
                }
                await session.commitTransaction();
            } catch (err) {
                await session.abortTransaction();
                throw new Error(err)
            } finally {
                session.endSession();
            }
        }
        res.json({
            success: true,
            message: 'Успешно'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
    
}

//Send ALL DOCS
exports.send_Date_Timeframes = async (req,res) =>{
    try{
        const orderDateTime = await OrderDateTime.find({}).sort({UTC: 1});
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
            { $sort : { UTC : 1 } },
            { $unwind : "$timeframe"},
            {
                $match : 
                { 
                    $or:[
                        {
                            date: moment().format('DD-MM-YYYY'),
                            'timeframe.from' : {$gt: moment().add(2,'H').format('HH:mm')},
                            $expr: {$lt:["$timeframe.orders", "$timeframe.max"]} 
                        },
                        {
                            date:{$ne:moment().format('DD-MM-YYYY')},
                            $expr:{$lt:["$timeframe.orders", "$timeframe.max"]}
                        }
                    ]
                },
                
            },    
        ])
        res.json({
            success: true,
            from: timeframe[0].timeframe.from
        })
    } catch (err) {
        console.log(err)
        res.status(204).json({
            success: false,
            message: err.message
        })
    }
    
}


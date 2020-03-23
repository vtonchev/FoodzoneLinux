const OrderDateTime = require('../models/orderDateTime');
var moment = require('moment');

//Create days
exports.create_orderDate_7days_Ahead = async (req, res) => {
    try {
        for(i = 0; i <= 7; i++){
            const newOrderDateTime = new OrderDateTime({
                date: moment().add(i,'days').format('DD-MM-YYYY'),
            // ////////////////////--------------- ======>UPDATE<======-------------/////////////////////// //
                dayOfWeek: moment().add(i,'days').format('dddd')
            // ////////////////////--------------- ======>UPDATE<======-------------/////////////////////// //
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
// ////////////////////--------------- ======>UPDATE<======-------------/////////////////////// //
        if(req.body.dayOfWeek == false){
// ////////////////////--------------- ======>UPDATE<======-------------/////////////////////// //
            await OrderDateTime.updateMany(
                {
                    $addToSet: { 
                        timeframe:
                            {
                                from: req.body.from,
                                to: req.body.to,
                                orders: 0,
                                max: req.body.max || process.env.MAX_ORDERS
                            }
                    }  
                }
            )
// ////////////////////--------------- ======>UPDATE<======-------------/////////////////////// //
        } else {
            await OrderDateTime.updateMany( {dayOfWeek: req.body.dayOfWeek},
                {
                    $addToSet: { 
                        timeframe:
                            {
                                from: req.body.from,
                                to: req.body.to,
                                orders: 0,
                                max: req.body.max || process.env.MAX_ORDERS
                            }
                    }  
                }
            )
        }
// ////////////////////--------------- ^^^^^^^^^^^^UPDATE^^^^^^^^^^-------------/////////////////////// //        
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
        const alldays = await OrderDateTime.find().sort({ _id: -1 }); // it is better to sort them by day
        const firstDay = await OrderDateTime.findOne();
        const lastDay = alldays[0];
// ////////////////////--------------- ======>UPDATE<======-------------/////////////////////// //
        const sameWeekDay = await OrderDateTime.findOne({dayOfWeek: moment(lastDay.date, 'DD-MM-YYYY').add(1,'days').format('dddd')});
// ////////////////////--------------- ^^^^^^^^^^^^UPDATE^^^^^^^^^^-------------/////////////////////// //
        await OrderDateTime.deleteOne(firstDay)
        const newOrderDateTime = new OrderDateTime({
            date: moment(lastDay.date, 'DD-MM-YYYY').add(1,'days').format('DD-MM-YYYY'),
// ////////////////////--------------- ======>UPDATE<======-------------/////////////////////// //
            dayOfWeek: moment(lastDay.date, 'DD-MM-YYYY').add(1,'days').format('dddd'),
// ////////////////////--------------- ^^^^^^^^^^^^UPDATE^^^^^^^^^^-------------/////////////////////// //
            timeframe: sameWeekDay.timeframe
        })
        await newOrderDateTime.save();
        await OrderDateTime.findOneAndUpdate({date: newOrderDateTime.date},
            {
                $set:
                    {
                        "timeframe.$[].orders" : 0,
                        "timeframe.$[].max" : process.env.MAX_ORDERS,
                    } 
            }
        )

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

//Update max properties of specific timeframes 
exports.update_Max_Property = async (req, res) => {
    try {
        if(req.body.allSelected){
            await OrderDateTime.update(
                {date : req.body.date},
                { $set: { "timeframe.$[].max": req.body.max } }
            )
        } else {
            for(i = 0; i < req.body.selectedTimeframe.length; i++){
                await OrderDateTime.update(
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
        const orderDateTime = await OrderDateTime.find({}).exec();
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
        const timeframe = await OrderDateTime.find(
            { date: req.params.date},
            { _id: 0, timeframe: { $elemMatch: { from: req.params.from } } }     
        )
        console.log(timeframe[0].timeframe[0])
        res.json({
            success: true,
            timeframe: timeframe[0].timeframe[0]
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

//Add order to a specific timeframe
exports.add_Order_To_Timeframe = async (req,res) =>{
    try {
        
    } catch (err) {
        
    }
}


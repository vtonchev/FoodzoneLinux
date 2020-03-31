const router = require("express").Router();
const orderDateTimeController = require ("../controllers/orderDateTimeController");

//Get request 
router.get("/orderDateTime", orderDateTimeController.send_Date_Timeframes);

//POST request - create a new orderDateTime
router.post("/orderDateTime", orderDateTimeController.create_orderDate_7days_Ahead);

//PATCH request - create a new Timeframe
router.patch("/orderDateTime", orderDateTimeController.create_Timeframe);

//POST request - refresh Days (create a new day and delete the first)
router.post("/update/orderDateTime", orderDateTimeController.update_Days);

//PATCH request - update max orders
router.patch("/update/orderDateTime/max", orderDateTimeController.update_Max_Property);

//GET request - send specific timeframe for a specific day
router.get("/orderDateTime/:date/:from", orderDateTimeController.send_Specific_Timeframe);

//GET request - send first available timeframe 
router.get("/orderDateTime/available", orderDateTimeController.send_Available_Timeframe);

module.exports = router;
const router = require("express").Router();
const orderController = require ("../controllers/orderController");
const verifyToken = require('../middleware/verify-token'); 

router.post("/order", orderController.create_Order);

router.patch("/order/:id", orderController.update_Order);

router.get("/order/timeframe/:date/:time", orderController.get_Orders_By_Timeframe);

router.get("/order/user", verifyToken, orderController.get_Orders_By_User);
module.exports = router;

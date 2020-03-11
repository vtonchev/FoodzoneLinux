const router = require("express").Router();
const orderController = require ("../controllers/orderController");

router.post("/order", orderController.create_Order);

router.get("/order", orderController.get_Orders);
module.exports = router;

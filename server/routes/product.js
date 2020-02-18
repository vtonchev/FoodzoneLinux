const router = require("express").Router();
//import middleware
const upload = require("../middleware/upload-photo"); 
// import controllers 
const productController = require ("../controllers/productController");

////////////////////
//     MAIN       //
////////////////////

// POST request - create a new product
router.post("/products", upload.single("photo"), productController.create_Product)

//GET request - get all products
router.get("/products", productController.get_All_Products);

//GET products filtered by category
router.get("/products/categories/:id", productController.get_Products_By_Category)

//GET products fillteres by subcategory
router.get("/products/subcategories/:id", productController.get_Products_By_Subcategory)

//GET request - get a single product
router.get("/products/:id", productController.get_Single_Product)

//PATCH request - Update a single product
router.patch("/products/:id", upload.single("photo") , productController.update_Single_Product)

//DELETE request - delete a single product
router.delete("/products/:id", productController.delete_Single_Product)

module.exports = router;
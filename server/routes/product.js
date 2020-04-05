const router = require("express").Router();
//import middleware
const upload = require("../middleware/upload-photo");
const deletePhoto = require('../middleware/delete-photo');
// import controllers 
const productController = require ("../controllers/productController");

////////////////////
//     MAIN       //
////////////////////

// POST request - create a new product
router.post("/products", upload.single("photo"), productController.create_Product);

//GET request - get all products
router.get("/products", productController.get_All_Products);

//GET products filtered by productID
router.get("/products/productID/:id", productController.get_Products_By_ProductID);

//GET products filtered by category
router.get("/products/categories/:id", productController.get_Products_By_Category);

//GET products filtered by subcategory
router.get("/products/subcategories/:id", productController.get_Products_By_Subcategory);

//GET products filtered by suggested
router.get("/products/suggested/true", productController.get_Products_By_Suggested);

//GET 20 products filltered by suggested
router.get("/products/suggested/20", productController.get_Products_By_Suggested_20);

//GET products filtered by sale
router.get("/products/sale/true", productController.get_Products_By_Sale);

//GET products filtered by bought
router.get("/products/bought/true", productController.get_Products_By_Bought);

//GET request - get a single product
router.get("/products/:id", productController.get_Single_Product);

//PATCH request - Update a single product
router.patch("/products/:id", upload.single("photo") , deletePhoto.delete_Photo , productController.update_Single_Product);

//DELETE request - delete a single product
router.delete("/products/:id", deletePhoto.delete_Photo ,productController.delete_Single_Product);

//Search Products
router.get("/products/search/:search", productController.get_Search_Products);

//Search Products Page
router.get("/products/search/page/:search", productController.get_Search_Products_Page);

module.exports = router;
const router = require("express").Router();
//import middleware
const upload = require("../middleware/upload-photo"); 
// import controllers 
const subcategoryController = require ("../controllers/subcategoryController");

////////////////////
//     MAIN       //
////////////////////

//POST request - create a new subcategory
router.post("/subcategories", upload.single("photo"),subcategoryController.create_Subcategory)

//GET request - get all subcategories in a single category
router.get("/subcategories/categories/:id", subcategoryController.get_Subcategories_By_Category)

module.exports = router;
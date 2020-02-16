const router = require("express").Router();
//import middleware
const upload = require("../middleware/upload-photo"); 
// import controllers 
const categoryController = require ("../controllers/categoryController");

////////////////////
//     MAIN       //
////////////////////


//POST request - create a new category
router.post("/categories", upload.single("photo"), categoryController.create_Category)

//GET request - get all categories 
router.get("/categories", categoryController.get_All_Categories)



module.exports = router;
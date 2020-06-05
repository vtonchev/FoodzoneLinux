const router = require("express").Router();
//import middleware
const upload = require("../middleware/upload-photo"); 
// import controllers 
const categoryController = require ("../controllers/categoryController");

////////////////////
//     MAIN       //
////////////////////


//POST request - create a new category
router.post("/categories", categoryController.create_Category)

//GET request - get all categories 
router.get("/categories", categoryController.get_All_Categories)

//GET request - get a single category
router.get('/categories/:id', categoryController.get_A_Single_Category)

//PATCH request - update a single category
router.patch('/categories/:id', categoryController.update_A_Single_Category)

//DELETE request - delete a single category
router.delete('/categories/:id', categoryController.delete_A_Single_Category)



module.exports = router;
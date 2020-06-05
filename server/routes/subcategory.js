const router = require("express").Router(); 
// import controllers 
const subcategoryController = require ("../controllers/subcategoryController");

////////////////////
//     MAIN       //
////////////////////

//POST request  - create a new subcategory
router.post(    '/subcategories',               subcategoryController.create_Subcategory);

//GET request   - get all subcategories in a single category
router.get(     '/subcategories/categories/:id',subcategoryController.get_Subcategories_By_Category);

//GET request   - get a single subcategory
router.get(     '/subcategories/:id',           subcategoryController.get_A_Single_Subcategory);

//Patch request - update subcat
router.patch(   '/subcategories/:id',           subcategoryController.update_A_Single_Subcategory);

//DELETE request- delete subcat
router.delete(  '/subcategories/:id',           subcategoryController.delete_A_Single_Subcategory);

module.exports = router;
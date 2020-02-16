const router = require("express").Router();
const Category = require("../models/category");
const Product = require("../models/product")

const upload = require("../middleware/upload-photo");  

//POST request - create a new category
router.post("/categories", async (req, res) => {
    try{
        const newCategory = new Category({
            type: req.body.type
        })
        await newCategory.save();

        res.json({
            success: true,
            message: "Successfuly created a new category"
        });
    } catch(err) {
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
});

//GET request - get all categories 
router.get("/categories", async (req, res) => {
    try{
        const categories = await Category.find();
        res.json({
            success: true,
            categories: categories
        })
    } catch(err) {
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
});



module.exports = router;
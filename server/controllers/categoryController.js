const Category = require('../models/category');

// create a new category 
exports.create_Category = async (req, res) => {
    try{
        const newCategory = new Category({
            type: req.body.type,
            photo: req.file.location
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
}


// GET all categories 
exports.get_All_Categories = async (req, res) => {
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
}
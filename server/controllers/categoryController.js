const Category = require('../models/category');

// create a new category 
exports.create_Category = async (req, res) => {
    try{
        const newCategory = new Category({
            title: req.body.title,
            photo: {
                url: req.file.location,
                key: req.file.key
            }
        })
        await newCategory.save();

        res.json({
            success: true,
            message: "Вие успешно създадохте нова категория: " + req.body.title
        });
    } catch(err) {
        res.status(500).json({
            success:false,
            message: err.message + "действието беше неуспешно" 
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
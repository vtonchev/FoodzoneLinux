const Subcategory = require("../models/subcategory");
// create a new subcategory
exports.create_Subcategory = async (req, res) => {
    try{
        const newSubcategory = new Subcategory({
            category: req.body.categoryID,
            title: req.body.title,
            photo: {
                url: req.file.location,
                key: req.file.key
            }
        })
        await newSubcategory.save();

        res.json({
            success: true,
            message: "Успешно създадохте подкатегория в категория: " + category.title
        });
    } catch(err) {
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}

// GET Subcategories filltered by Category
exports.get_Subcategories_By_Category = async (req, res) => {
    try{
        const subcategories = await Subcategory.find({category: req.params.id});
        res.json({
            success: true,
            subcategories: subcategories
        })
    } catch(err) {
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}
const Subcategory = require("../models/subcategory");
// create a new subcategory
exports.create_Subcategory = async (req, res) => {
    try{
        const newSubcategory = new Subcategory({
            category: req.body.categoryID,
            title: req.body.title
        })
        await newSubcategory.save();
        res.json({
            success: true,
            message: "Успешно създадохте подкатегория"
        });
    } catch(err) {
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}
//GET a single Subcategory
exports.get_A_Single_Subcategory = async (req, res) => {
    try{
        const subcategory = await Subcategory.findOne({_id: req.params.id}).populate('category').exec();
        res.json({
            success: true,
            subcategory: subcategory
        })
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
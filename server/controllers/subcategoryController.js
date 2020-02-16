const Subcategory = require("../models/subcategory");

exports.create_Subcategory = async (req, res) => {
    try{
        const newSubcategory = new Subcategory({
            type: req.body.type,
            subcategory: req.body.subcategoryID
        })
        await newSubcategory.save();

        res.json({
            success: true,
            message: "Successfuly created a new subcategory inside category: "+ req.body.categoryID
        });
    } catch(err) {
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}

exports.get_Subcategories_By_Category = async (req, res) => {
    try{
        const subcategories = await Subcategory.find({category: req.params.id}).populate("category").exec();
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
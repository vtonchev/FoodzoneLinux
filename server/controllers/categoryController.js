const Category = require('../models/category');
const Subcategory = require('../models/subcategory');
// CREATE a new category 
exports.create_Category             = async (req, res) => {
    try{
        const newCategory = new Category
        newCategory.title = req.body.title
        await newCategory.save();
        res.json({
            success: true,
            message: "Вие УСПЕШНО създадохте нова категория: " + req.body.title
        });
    } catch(err) {
        res.status(500).json({
            success:false,
            message: err.message + "действието беше НЕУСПЕШНО" 
        })
    }
}

// GET all categories 
exports.get_All_Categories          = async (req, res) => {
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

// GET a single category
exports.get_A_Single_Category       = async (req, res ) => {
    try {
        const category = await Category.findOne({_id: req.params.id})
        res.json({
            success: true,
            category: category
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// UPDATE a single category
exports.update_A_Single_Category    = async (req, res) => { 
    try {
        await Category.findOneAndUpdate({_id: req.params.id },
            {
                $set: req.body
            }
        )
        res.json({
            success: true,
            message: 'Категорията е УСПЕШНО редактирана'
        })  
    } catch(err) {
        res.status(500).json({
            success:false,
            message: err.message
        })
    };
}

// DELETE a single category
exports.delete_A_Single_Category    = async (req, res) => {
    try {
        await Category.deleteOne({_id: req.params.id});
        await Subcategory.deleteMany({category: req.params.id});
        res.json({
            success: true,
            message: 'Категорията е УСПЕШНО изтрита'
        })
        
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
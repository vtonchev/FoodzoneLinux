const Category = require('../models/category');

// create a new category 
exports.create_Category = async (req, res) => {
    try{
        const newCategory = new Category
        newCategory.title = req.body.title
        if(req.file){
            newCategory.photo.url = req.file.location 
            newCategory.photo.key = req.file.key
            await newCategory.save();
        } else {
            await newCategory.save();
        }

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

//get a single category
exports.get_A_Single_Category = async (req, res ) => {
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

// update a single category
exports.update_A_Single_Category = async (req, res) => { 
    try {
        await Category.findOneAndUpdate({_id: req.params.id },
            {
                $set: req.body
            }
        )
        if(req.file !== undefined){
            await Category.findOneAndUpdate({_id:req.params.id},{
                $set: {
                    photo: {
                        url: req.file.location,                                  
                        key: req.file.key       
                    }
                }
            })
        } 
        res.json({
            success:true,
        })  
    } catch(err) {
        res.status(500).json({
            success:false,
            message: err.message
        })
    };
}
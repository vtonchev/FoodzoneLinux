const Product = require("../models/product");

// create a new Product 
exports.create_Product = async (req, res) => {
    try{
        const newProduct = new Product({
            category: req.body.categoryID,
            subcategory: req.body.subcategoryID,
            title: req.body.title,
            description: req.body.description,
            photo: {
                url: req.file.location,
                key: req.file.key
            },
            price: req.body.price,
            weight: req.body.weight,
            stockQuantity: req.body.stockQuantity,
            properties: JSON.parse(req.body.properties),    
        });
        await newProduct.save();
        res.json({
            status: true,
            message: "Successfully saved"
        });

    } catch(err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
    
}

// GET all products 
exports.get_All_Products = async (req, res) => {
    try{
        const products = await Product.find().populate("category subcategory").exec();
        res.json({
            success: true,
            products: products
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// GET products filtered by category
exports.get_Products_By_Category = async (req, res) => {
    try{
        const page = req.query.page;
        let sort = req.query.sort;
        const offset = 10;
        let products = undefined;
        if(sort){
            // SORT LOGIC HERE 
        } else {
            products = await Product.find({category: req.params.id}).skip((page-1)*offset).limit(offset).populate("category subcategory").exec();
        }
        // SORT LOGIC HERE
        const all = await Product.countDocuments({category: req.params.id});
        res.json({
            success: true,
            products: products,
            count: all
        })
    } catch (err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// Get products filtered by subcategory

exports.get_Products_By_Subcategory = async (req, res) =>{
    try {
        const page = req.query.page;
        const offset = 10;
        const all = await Product.countDocuments({subcategory: req.params.id});
        const products = await Product.find({subcategory: req.params.id}).skip((page-1)*offset).limit(offset).populate("category subcategory").exec();
        res.json({
            success: true,
            products: products,
            count: all
        }) 
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// GET a single product 
exports.get_Single_Product =  async (req, res) => {
    try{
        const product = await Product.find({_id: req.params.id }).populate("category subcategory").exec();
        res.json({
            success: true,
            product: product
        })
    } catch(err) {
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}
// Update a single product
exports.update_Single_Product = async (req, res) => {
    try{
        req.body.properties = JSON.parse(req.body.properties);
        console.log(req.body);
        await Product.findOneAndUpdate({_id: req.params.id },
            {
                $set: req.body
            }
        )
        if(req.file !== undefined){
            await Product.findOneAndUpdate({_id:req.params.id},{
                $set: {
                    photo: {
                        url: req.file.location,
                        key: req.file.key
                    }
                }
            })
        }   
        res.json({
            success: true,
        })
    } catch(err) {
        console.log(err.message);
        res.status(500).json({
            success:false,
            message: err.message
        })
        
    }
}
// delete  a single Product
exports.delete_Single_Product = async (req, res) => {
    try{
        const deletedProduct = await Product.findOneAndDelete({ _id: req.params.id })
        if(deletedProduct){
            res.json({
                success: true,
                message: "Successfully deleted"
            })
        }
       
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



//////////////////////
///// SOME TRIES /////

exports.try = async (req, res) => {
    
}
const Product = require("../models/product");
// Products per page 
const offset = 24 
// create a new Product
// .sort({sale: -1, stockQuantity: -1}) first sorts sale and then where sale field are equal it sorts them by stockquantity 
exports.create_Product                  = async (req, res) => {
    try{
        const newProduct = new Product({
            category: req.body.categoryID,
            subcategory: req.body.subcategoryID,
            title: req.body.title,
            productID: req.body.productID,
            description: req.body.description,
            photo: {
                url: req.file.location,
                key: req.file.key
            },
            sale: JSON.parse(req.body.sale),
            oldPrice: JSON.parse(req.body.oldPrice),
            price: req.body.price,
            weight: req.body.weight,
            unit: req.body.unit,
            stockQuantity: req.body.stockQuantity,
            suggested: req.body.suggested,
            properties: JSON.parse(req.body.properties),    
        });
        await newProduct.save();
        res.json({
            status: true,
            message: "Продуктът е успешно създаден"
        });
    } catch(err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
    
}
// GET all products 
exports.get_All_Products                = async (req, res) => {
    try{
        const page = req.query.page;
        console.log(page)
        let products = [];
        products = await Product.find().skip((page-1)*offset).limit(offset).populate("category subcategory");
        console.log(products)
        const count = await Product.countDocuments({});
        res.json({
            success: true,
            products: products,
            count: count
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
// Get product filtered by productID
exports.get_Products_By_ProductID       = async (req, res) => {
    try{
        const products = await Product.find({productID: req.params.id}).populate("category subcategory");
        res.json({
            success: true,
            products: products,
        })
    } catch (err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
// GET products filtered by category
exports.get_Products_By_Category        = async (req, res) => {
    try{
        const page = req.query.page;
        let sort = req.query.sort;
        let products = [];
        if(sort){
            switch(sort){
                case '1':
                products = await Product.find({category: req.params.id})
                .sort({price : 1})
                .skip((page-1)*offset)
                .limit(offset)
                .exec();
                break;
                case '2':
                products = await Product.find({category: req.params.id})
                .sort({price: -1})
                .skip((page-1)*offset)
                .limit(offset)
                .exec();
                break;
                case '3':
                products = await Product.find({category: req.params.id})
                .sort({title : 1})
                .skip((page-1)*offset)
                .limit(offset)
                .exec();
                break;
            }
        } else {
            products = await Product.find({category: req.params.id})
            .sort({sale: -1, stockQuantity: -1})
            .skip((page-1)*offset)
            .limit(offset)
            .exec();
        }
        // SORT LOGIC HERE
        const count = await Product.countDocuments({category: req.params.id});
        res.json({
            success: true,
            products: products,
            count: count
        })
    } catch (err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
// GET products filtered by subcategory
exports.get_Products_By_Subcategory     = async (req, res) => { 
    try {
        const page = req.query.page;
        let sort = req.query.sort;
        let products = [];
        if(sort){
            switch(sort){
                case '1':
                products = await Product.find({subcategory: req.params.id})
                .sort({price : 1})
                .skip((page-1)*offset)
                .limit(offset)
                .exec();
                break;
                case '2':
                products = await Product.find({subcategory: req.params.id})
                .sort({price:-1})
                .skip((page-1)*offset)
                .limit(offset)
                .exec();
                break;
                case '3':
                products = await Product.find({subcategory: req.params.id})
                .sort({title : 1})
                .skip((page-1)*offset)
                .limit(offset)
                .exec();
                break;
            }
        } else {
            products = await Product.find({subcategory: req.params.id})
            .sort({sale: -1, stockQuantity: -1})
            .skip((page-1)*offset)
            .limit(offset)
            .exec();
        }
        const count = await Product.countDocuments({subcategory: req.params.id});
        res.json({
            success: true,
            products: products,
            count: count
        }) 
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
// GET products filtered by suggested 
exports.get_Products_By_Suggested       = async (req, res) => {
    try {
        const page = req.query.page;
        let sort = req.query.sort;
        let products = [];
        if(sort){
            switch(sort){
                case '1':
                products = await Product.find({suggested: true})
                .sort({price : 1})
                .skip((page-1)*offset)
                .limit(offset)
                .exec();
                break;
                case '2':
                products = await Product.find({suggested: true})
                .sort({price:-1})
                .skip((page-1)*offset)
                .limit(offset)
                .exec();
                break;
                case '3':
                products = await Product.find({suggested: true})
                .sort({title : 1})
                .skip((page-1)*offset)
                .limit(offset)
                .exec();
                break;
            }
        } else {
            products = await Product.find({suggested: true})
            .sort({sale: -1, stockQuantity: -1})
            .skip((page-1)*offset)
            .limit(offset)
            .exec();
        }
        const count = await Product.countDocuments({suggested: true});
        res.json({
            success: true,
            products: products,
            count: count
        }) 
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
// GET products filtered by sale
exports.get_Products_By_Sale            = async (req, res) => {
    try {
        const page = req.query.page;
        let sort = req.query.sort;
        let products = [];
        if(sort){
            switch(sort){
                case '1':
                products = await Product.find({sale: { $ne: null }})
                .sort({price : 1})
                .skip((page-1)*offset)
                .limit(offset)
                .exec();
                break;
                case '2':
                products = await Product.find({sale: { $ne: null }})
                .sort({price:-1})
                .skip((page-1)*offset)
                .limit(offset)
                .exec();
                break;
                case '3':
                products = await Product.find({sale: { $ne: null }})
                .sort({title : 1})
                .skip((page-1)*offset)
                .limit(offset)
                .exec();
                break;
            }
        } else {
            products = await Product.find({sale: { $ne: null }})
            .sort({sale: -1, stockQuantity: -1})
            .skip((page-1)*offset)
            .limit(offset)
            .exec();
        }
        const count = await Product.countDocuments({sale: { $ne: null }});
        res.json({
            success: true,
            products: products,
            count: count
        }) 
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
// GET products filtered by bought
exports.get_Products_By_Bought          = async (req, res) => {
    try {
        const page = req.query.page;
        let sort = req.query.sort;
        let products = [];
        if(sort){
            switch(sort){
                case '1':
                products = await Product.find({bought: { $gt : 50 }})
                .sort({price : 1})
                .skip((page-1)*offset)
                .limit(offset)
                .exec();
                break;
                case '2':
                products = await Product.find({bought: { $gt : 50 }})
                .sort({price:-1})
                .skip((page-1)*offset)
                .limit(offset)
                .exec();
                break;
                case '3':
                products = await Product.find({bought: { $gt : 50 }})
                .sort({title : 1})
                .skip((page-1)*offset)
                .limit(offset)
                .exec();
                break;
            }
        } else {
            products = await Product.find({bought: { $gt : 50 }})
            .sort({sale: -1, stockQuantity: -1})
            .skip((page-1)*offset)
            .limit(offset)
            .exec();
        }
        const count = await Product.countDocuments({bought: { $gt : 50 }});
        res.json({
            success: true,
            products: products,
            count: count
        }) 
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
// GET 20 products filltered by suggested
exports.get_Products_By_Suggested_20    = async (req, res) => {
    try {
        let products = [];
        products = await Product.find({suggested: true, stockQuantity: { $ne: 0 }})
        .sort({sale: -1})
        .limit(20)
        .exec();
        res.json({
            success: true,
            products: products,
        }) 
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
// GET a single product 
exports.get_Single_Product              = async (req, res) => {
    try{
        const product = await Product.findOne({_id: req.params.id }).populate("category subcategory").exec();
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
// SEARCH for products 
exports.get_Search_Products             = async (req, res) => {
    try {
        console.log("searching ...")
        const search = decodeURIComponent(req.params.search);
        console.log("searching ...")
        const products = await Product.find( { title: { $regex: '^'+ search , $options:'i'} }).limit(5);
        res.json({
            success: true,
            products: products
        })
    } catch (err) {
        console.log('error: ' + err)
        res.status(500).json({
            success:false,
            message: err
        })
    }
}
// SEARCH for products FULL
exports.get_Search_Products_Page        = async (req, res) => {
    try {
        const page = req.query.page;
        let sort = req.query.sort;
        let products = [];
        const search = decodeURIComponent(req.params.search);
        if(sort){
            switch(sort){
                case '1':
                products = await Product.find( { $text: { $search: search } })
                .sort({price : 1})
                .skip((page-1)*offset)
                .limit(offset)
                .exec();
                break;
                case '2':
                products = await Product.find( { $text: { $search: search } })
                .sort({price:-1})
                .skip((page-1)*offset)
                .limit(offset)
                .exec();
                break;
                case '3':
                products = await Product.find( { $text: { $search: search } })
                .sort({title : 1})
                .skip((page-1)*offset)
                .limit(offset)
                .exec();
                break;
            }
        } else {
            products = await Product.find( { $text: { $search: search } })
            .sort({sale: -1, stockQuantity: -1})
            .skip((page-1)*offset)
            .limit(offset)
            .exec();
        }
        const count = await Product.countDocuments({ $text: { $search: search } });
        res.json({
            success: true,
            products: products,
            count: count
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success:false,
            message: err
        })
    }
}
// UPDATE a single product
exports.update_Single_Product           = async (req, res) => {
    try{
        if(req.body.properties){
            req.body.properties = JSON.parse(req.body.properties);
        }
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
            message: 'Продуктът е успешно редактиран'
        })
    } catch(err) {
        res.status(500).json({
            success:false,
            message: err.message
        })
        
    }
}
// DELETE a single Product
exports.delete_Single_Product           = async (req, res) => {
    try{
        const deletedProduct = await Product.deleteOne({ _id: req.params.id })
        if(deletedProduct){
            res.json({
                success: true,
                message: "Продуктът е успешно изтрит"
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

// exports.try = async (req, res) => {
    
// }
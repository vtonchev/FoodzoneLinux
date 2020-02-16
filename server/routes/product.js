const router = require("express").Router();
const Product = require("../models/product");
const Category = require("../models/category")

const upload = require("../middleware/upload-photo");

// POST request - create a new product
router.post("/products", upload.single("photo") ,async (req, res) => {
    try{
        const newProduct = new Product({
            title: req.body.title,
            description: req.body.description,
            category: req.body.categoryID,
            photo: req.file.location,
            price: req.body.price,
            weight: req.body.weight,
            stockQuantity: req.body.stockQuantity
        });
        await newProduct.save();
        res.json({
            status: true,
            message: "Successfully saved"
        });

    } catch(err) {

        res.status(500).json({
            success: false,
            message: err.message
        })
    }
    
})

// router.get("/q",(req,res) => {
//     Category.findOne({type: "book"}, (err,category) => {
//         category._id;
//     })
    
//     res.json({
//         success:true,
//         categoryID: categoryID
//     })
    
// })

//GET request - get all products
router.get("/products", async (req, res) => {
    try{
        const products = await Product.find();
        res.json({
            success: true,
            products: products
        })
    } catch(err) {
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
});
// GET products filtered by category

router.get("products/category/:id", async (req, res) => {
    try{
        const products = await Product.find({category: req.params.id});
        res.json({
            success: true,
            products: products
        })
    } catch {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

//GET request - get a single product

router.get("/products/:id", async (req, res) => {
    try{
        const product = await Product.find({_id: req.params.id });
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
});


//PUT request - Update a single product

router.put("/products/:id", upload.single("photo") ,async (req, res) => {
    try{
        const product = await Product.findOneAndUpdate(
            {_id: req.params.id },
            {
            $set:{
                    title: req.body.title,
                    description: req.body.description,
                    category: req.body.categoryID,
                    photo: req.file.buffer,
                    price: req.body.price,
                    weight: req.body.weight,
                    stockQuantity: req.body.stockQuantity         
                },
            },
            {upsert: true} //if the object (product) does not exist then create one 
        );
        res.json({
            success: true,
            updatedProduct: product
        })
    } catch(err) {
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
});


//DELETE request - delete a single product
router.delete("/products/:id", upload.single("photo") ,async (req, res) => {
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
});

module.exports = router;
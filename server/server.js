const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); 
const cors = require('cors');
const app = express();
dotenv.config();

// CORS configurations - SECURITY IMPORTANT MIDDLEWARE !!!!!
// var corsOptions = {
//     origin: process.env.ADMIN_SERVER_URL,
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
app.use(cors());

// Database connection
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, (err) => {
    if(!err){
        console.log("Connected to the database")
    } else {
        console.log(err);
    }
});

//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));  //false cant pass data normaly  check docs

// require apis
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const subcategoryRoutes = require("./routes/subcategory");
const authRoutes = require('./routes/auth');
const orderDateTimeRoutes = require('./routes/orderDateTime');
const orderRoutes = require('./routes/order');
const addressRoutes = require('./routes/address');
//----------------------------------------------------------- SIMULATE LOT OF PROD
// const Product = require("./models/product");
// const faker = require('faker');
// var i = 1
// while(i < 5000){
//     const newProduct = new Product({
//         category: "5e53ed71b4a1883840b9a7a0",
//         subcategory: "5e53ed83b4a1883840b9a7a1",
//         title: faker.commerce.productName(),
//         description: 'одуц бдцбсдбк фкжбфдкйжд жнкдфйжнфджйндф н кдф жк дфкж скй цсц  е0цхосжх о осфжу осфхж ос8ж сожсофжх сожх осжхадфиужх аиеферуи яиур яееруихереир ж',
//         photo: {
//             url: 'https://picsum.photos/id/1/800',
//             key: 'name.jpeg'
//         },
//         sale: 0,
//         oldPrice: null,
//         price: 3.20,
//         weight: 1,
//         unit: 'л',
//         stockQuantity: 25,
//         properties: {
//             ingredients : "Е430,Е320, Мляко единахсабхасд дуисуижф фджухдффж дф жфд",
//             manufacturer : "Мегле АД",
//             calories : "122/344",
//             carbohydrates : "12",
//             sugars : "0.8",
//             fats : "12",
//             saturated : "23",
//             proteins : "56",
//             brand : "Мегле",
//             origin : "Германия"
            
//         }, 
//     })
//     newProduct.save()
//     i++
// }
// console.log(i);
//---------------------------------------------- END OF SIMULATION
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", subcategoryRoutes);
app.use("/api", authRoutes);
app.use("/api", orderDateTimeRoutes);
app.use("/api", orderRoutes);
app.use("/api", addressRoutes);

app.listen(3000, (err) => {
    if(!err){
        console.log("Listening on PORT",3000);
    } else {
        console.log("error");
    }
});




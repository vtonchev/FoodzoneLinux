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
const orderRoutes = require('./routes/order')

app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", subcategoryRoutes);
app.use("/api", authRoutes);
app.use("/api", orderDateTimeRoutes);
app.use("/api", orderRoutes);
app.listen(3000, (err) => {
    if(!err){
        console.log("Listening on PORT",3000);
    } else {
        console.log("error");
    }
});




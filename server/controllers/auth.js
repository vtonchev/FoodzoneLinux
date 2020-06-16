const User = require('../models/user');
const jwt = require('jsonwebtoken');
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");

//transporter for sending emails 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
});

exports.register_New_User =  async function (req, res) {
    if(req.body.email == false || req.body.password == false) {
        res.json({
            success: false,
            message: "Моля въведете имейл или парола"
        })
    } else {
        try {
            req.body.name = JSON.parse(req.body.name)
            const newUser = new User({
                name: req.body.name,
                phone:req.body.phone,
                email: req.body.email,
                password: req.body.password,
                favouriteProducts: []
            });

            //create random string
            const emailToken = randomstring.generate();

            //assign the random string to the account
            newUser.token = emailToken;

            //send email 
            const email = await transporter.sendMail({
                from: process.env.EMAIL, // sender address
                to: req.body.email, // list of receivers
                subject: "Потвърждение на имейла", // Subject line
                text: "", // plain text body
                html: "<h4>Здравейте моля потвъдете си имейла като натиснете този линк</h4> <а>" + process.env.CLIENT_SERVER_DOMAIN_NAME + "/emailverification/" + emailToken + "</а>", // html body
            });
            await newUser.save();
            // const token = jwt.sign(newUser.toJSON(), process.env.TOKEN_SECRET, {
            //     expiresIn: 604800 // 1week
            // });
            res.status(200).json({
                success: true,
                // token: token,
                message: 'За да потвърдите имейла си моля кликнете на линка, който ви изпратихме в пощата'
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
};

exports.verify_Email = async (req, res) => {
    try {
        const foundUser = await User.findOne({ token: req.body.token.toString()})
        if (!foundUser) {
            res.status(200).json({
                success: false,
                message: 'няма потребител с такъв имейл или имейлът е вече потвърден !'
            })
        } else {
            if (foundUser.verified) {
                res.status(200).json({
                    success: true,
                    message: 'имейлът е вече потвърден !'
                })
            } else {
                await User.updateOne({token: req.body.token.toString()},
                    {
                        verified : true, 
                        $unset: { token: req.body.token.toString()},
                        multi: true, 
                        safe: true
                    },
                )
                res.status(200).json({
                    success: true,
                    message: 'Имейлът е успешно потвърден !'
                })
            }
        } 
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.show_User = async (req,res) => {
    try{
        let foundUser = await (await User.findOne({_id: req.decoded._id})).populate('favouriteProducts');
        if (foundUser) {
            res.json({
                success: true,
                user: foundUser
            })
        }
    } catch (err) {
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
};

exports.login_User = async (req, res) => {
    try {
        const foundUser = await User.findOne({ email: req.body.email }).populate('favouriteProducts');
        if (!foundUser) {
            res.status(401).json({
                success: false,
                message: 'Грешен потребител'
            })
        } else {
            if (foundUser.comparePassword(req.body.password)) {
                if (foundUser.verified){
                    foundUser.password = '';
                    const token = jwt.sign(foundUser.toJSON(), process.env.TOKEN_SECRET, {
                        expiresIn: 604800 //1 week 604800
                    })
                    res.status(200).json({ 
                        success: true, 
                        token: token
                    })
                } else {
                    res.status(401).json({
                        success:false,
                        message: 'Моля потвърдете си имейла'
                    })
                }
                
            } else {
                res.status(401).json({
                    success:false,
                    message: 'Грешен потребител или парола'
                })
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
};

exports.change_Password = async (req, res) => {
    try {
        let foundUser = await User.findOne({ _id: req.decoded._id });
        if (foundUser.comparePassword(req.body.password)) {
            foundUser.password = req.body.newPassword;
            await foundUser.save()
            res.json({ 
                type: 'success',
                title: 'Успешно !',
                message: 'Вие променихте паролата си моля влезте отново в акаунта си.'
            })
        } else {
            res.json({
                type: 'error',
                title: 'Грешка !',
                message: 'Грешна парола'
            })
        }
        
    } catch (err) {
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
};

exports.favourite_Product = async (req, res) => {
    try {
        const foundUser = await User.findOne({ _id: req.decoded._id });
        const isTheProductFavourite = foundUser.favouriteProducts.find((prod) => prod == req.body.favouriteProduct);
        if(isTheProductFavourite){
            await User.updateOne({ _id: req.decoded._id },
                { $pull: { favouriteProducts: req.body.favouriteProduct } }
            )
            res.json({
                type: 'success',
                message: 'Успешно премахнахте продукта от любими продукти'
            })
        } else {
            await User.updateOne({ _id: req.decoded._id },
                {
                    $push: { favouriteProducts: req.body.favouriteProduct}
                }
            )
            res.json({
                type: 'success',
                message: 'Успешно добавихте любим продукт'
            })
        }
    } catch (err) {
        console.log(err)
        res.json({
            type: 'error',
            message: 'Възникна ГРЕШКА при добавянето/премахването на любим продукт!'
        })
    }
}

exports.get_Favourite_Product = async (req, res) => {
    try {
        const offset = 24
        const page = req.query.page;
        const favouriteProducts = await User
        .findOne({ _id: req.decoded._id }, 'favouriteProducts')
        .populate({
            path:'favouriteProducts',
            options: {
                limit: offset,
                sort: {stockQuantity: -1},
                skip: (page-1)*offset
        
            }
        })
        let count = await User.findOne({ _id: req.decoded._id },'favouriteProducts');
        count = count.favouriteProducts.length
        res.status(200).json({
            success: true,
            count: count,
            favouriteProducts: favouriteProducts.favouriteProducts
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            success: false,
        })
    }
}

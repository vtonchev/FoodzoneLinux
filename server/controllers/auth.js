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
                password: req.body.password
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
            console.log(email)
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
        let foundUser = await User.findOne({_id: req.decoded._id});
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
        const foundUser = await User.findOne({ email: req.body.email });
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
        console.log(req.body.password)
        let foundUser = await User.findOne({ _id: req.decoded._id });
        if (foundUser.comparePassword(req.body.password)) {
            foundUser.password = req.body.newPassword;
            await foundUser.save()
            res.json({ 
                success: true, 
            })
        } else {
            res.status(403).json({
                success:false,
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
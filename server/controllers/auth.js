const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register_New_User =  async function (req, res) {
    if(req.body.email == false || req.body.password == false) {
        res.json({
            success: false,
            message: "Моля въведете имейл или парола"
        })
    } else {
        try {
            req.body.name = JSON.parse(req.body.name)
            console.log(req.body.name)
            const newUser = new User({
                name: req.body.name,
                phone:req.body.phone,
                email: req.body.email,
                password: req.body.password
            });
            await newUser.save();
            const token = jwt.sign(newUser.toJSON(), process.env.TOKEN_SECRET, {
                expiresIn: 604800 // 1week
            });
            res.json({
                success: true,
                token: token,
                message: 'Успешна регистрация'
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
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
        let foundUser = await User.findOne({ email: req.body.email });
        if (foundUser == false) {
            res.status(403).json({
                success: false,
                message: 'Грешен потребител или парола'
            })
        } else {
            if (foundUser.comparePassword(req.body.password)) {
                const token = jwt.sign(foundUser.toJSON(), process.env.TOKEN_SECRET, {
                    expiresIn: 604800 //1week
                })
                res.json({ 
                    success: true, 
                    token: token
                })
            } else {
                res.status(403).json({
                    success:false,
                    message: 'Грешен потребител или парола'
                })
            }
        }
    } catch (err) {
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
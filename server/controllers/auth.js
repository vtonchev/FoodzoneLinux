const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register_New_User =  async (req, res) => {
    if(!req.body.email || !req.body.password) {
        res.json({
            success:false,
            message: "Моля въведете имейл или парола"
        })
    } else {
        try {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            await newUser.save();
            let token = jwt.sign(newUser.toJSON(), process.env.TOKEN_SECRET, {
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
        let foundUser = await User.findOne({_id: req.decoded._id})
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
        if (!foundUser) {
            res.status(403).json({
                success: false,
                message: 'Грешен потребител или парола'
            })
        } else {
            if (foundUser.comparePassword(req.body.password)) {
                let token = jwt.sign(foundUser.toJSON(), process.env.TOKEN_SECRET, {
                    expiresIn: 604800 //1week
                })

                res.json({ 
                    success: true, 
                    token: token})
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
}
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        firstName: String,
        lastName:String
    },
    email: {type: String, unique: true, required: true},
    phone: String,
    password: {type: String, required: true },
    // address: {type: Schema.Types.ObjectId, ref:"Address"},
});

userSchema.pre('save', function(next){
    let user = this;
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10, function(err, salt){
            if(err){
                return next(err)
            }
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err){
                    return next(err);
                }

                user.password = hash;
                next();
            })
        })
    }
})

userSchema.methods.comparePassword = function(password, next) {
    const user = this;
    return bcrypt.compareSync(password, user.password)
}

module.exports = mongoose.model("User", userSchema);
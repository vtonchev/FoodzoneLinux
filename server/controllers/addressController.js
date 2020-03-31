const Address = require('../models/address');
const User = require('../models/user');
// CREATE ADDRESS
exports.create_User_Address = async (req,res) => {
    try{
        const newAddress = new Address({
            user: req.decoded._id,
            city: req.body.city,
            housingArea: req.body.housingArea,
            street: req.body.street,
            outsideDoor: req.body.outsideDoor,
            floor: req.body.floor,
            apartment: req.body.apartment,
        });
        newAddress.save();
        // const saveAddressAndUpdateUser = [
        //     newAddress.save(),
        //     User.findOneAndUpdate({_id: req.decoded._id},{
        //         $set:{
        //             address: newAddress._id
        //         }
        //     })
        // ]
        // Promise.all(saveAddressAndUpdateUser).then(() => {
        //     res.json({
        //         status: true,
        //         message: "Successfully saved"
        //     });
        // }).catch((err) => {
        //     res.status(500).json({
        //         status: false,
        //         message: err.message
        //     })
        // });
    } catch(err) {
        console.log(err)
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
};
// UPDATE ADDRESS
exports.update_User_Address = async (req,res) => {
    try{
        await Address.findOneAndUpdate({_id: req.params.id},
            {
                $set: req.body
            }
        )
        res.json({
            success: true,
        })
    } catch (err) {
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
};
// GET ADDRESS
exports.get_User_Address = async (req, res) => {
    try{
        const addresses = await Address.find({user: req.decoded._id})
        res.json({
            success: true,
            addresses: addresses
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}
// DELETE ADDRESS
exports.delete_User_Address = async (req, res) => {
    try{
        await Address.findOneAndDelete(
            {
                $and : [
                    {user: req.decoded._id},
                    {_id: req.params.id}
                ]
            }
        )
            
        res.json({
            success: true,
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}
// exports.set_Deafault_Address = async (req, res) => {

// }

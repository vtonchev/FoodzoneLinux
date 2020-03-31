const router = require('express').Router();
const addressController = require('../controllers/addressController');
const verifyToken = require('../middleware/verify-token'); 


// CREATE ADDRESS
router.post('/address', verifyToken , addressController.create_User_Address);
// GET ADDRESS
router.get('/address' , verifyToken , addressController.get_User_Address);
// UPDATE ADDRESS
router.patch('/address/:id', addressController.update_User_Address);
// DELETE ADDRESS
router.delete('/address/:id', verifyToken, addressController.delete_User_Address)


module.exports = router;
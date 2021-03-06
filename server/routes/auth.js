const router = require('express').Router();
const authController = require('../controllers/auth');
const verifyToken = require('../middleware/verify-token'); 


// Signup Route
router.post('/auth/signup', authController.register_New_User);
// Email Verification Route
router.post('/auth/verify/email', authController.verify_Email);
// Profile Route
router.get('/auth/user', verifyToken, authController.show_User);
// Login Route
router.post('/auth/login', authController.login_User);
// Change password
router.post('/auth/password', verifyToken, authController.change_Password);
// Add Favourite Product
router.post('/user/favouriteProduct', verifyToken, authController.favourite_Product);
// Get Favourite Products
router.get('/user/favouriteProduct', verifyToken, authController.get_Favourite_Product)

module.exports = router;
const router = require('express').Router();
const authController = require('../controllers/auth');
const verifyToken = require('../middleware/verify-token'); 


// Signup Route
router.post('/auth/signup', authController.register_New_User);
// Profile Route
router.get('/auth/user', verifyToken, authController.show_User);
// Login Route
router.post('/auth/login', authController.login_User);
// Change password
router.post('/auth/password', verifyToken, authController.change_Password);

module.exports = router;
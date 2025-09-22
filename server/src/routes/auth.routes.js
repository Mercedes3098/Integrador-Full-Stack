const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/profile', verifyToken, authController.verifyToken);
router.post('/logout', authController.logout);
router.post('/change-password', verifyToken, authController.changePassword);

module.exports = router;
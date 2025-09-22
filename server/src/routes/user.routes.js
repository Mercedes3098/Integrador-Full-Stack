const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken, checkRoles } = require('../middlewares/auth.middleware');

router.get('/', verifyToken, checkRoles(['admin']), userController.getAllUsers);
router.get('/:id', verifyToken, checkRoles(['admin']), userController.getUserById);
router.put('/:id', verifyToken, checkRoles(['admin']), userController.updateUser);
router.delete('/:id', verifyToken, checkRoles(['admin']), userController.deleteUser);

module.exports = router;
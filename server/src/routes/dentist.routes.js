const express = require('express');
const router = express.Router();
const dentistController = require('../controllers/dentist.controller');
const { verifyToken, checkRoles } = require('../middlewares/auth.middleware');

router.get('/', verifyToken, checkRoles(['admin', 'patient', 'dentist']), dentistController.getAllDentists);
router.get('/specialties', verifyToken, checkRoles(['admin', 'patient']), dentistController.getSpecialties);
router.get('/:id', verifyToken, checkRoles(['admin', 'patient']), dentistController.getDentistById);
router.post('/', verifyToken, checkRoles(['admin']), dentistController.createDentist);
router.put('/:id', verifyToken, checkRoles(['admin']), dentistController.updateDentist);
router.delete('/:id', verifyToken, checkRoles(['admin']), dentistController.deleteDentist);

module.exports = router;
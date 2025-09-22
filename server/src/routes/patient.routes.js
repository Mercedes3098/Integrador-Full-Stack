const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');
const { verifyToken, checkRoles } = require('../middlewares/auth.middleware');

router.get('/', verifyToken, checkRoles(['admin']), patientController.getAllPatients);
router.post('/', verifyToken, checkRoles(['admin']), patientController.createPatient);
router.get('/profile', verifyToken, checkRoles(['patient']), patientController.getMyProfile);
router.get('/:id', verifyToken, checkRoles(['admin']), patientController.getPatientById);
router.put('/:id', verifyToken, checkRoles(['admin']), patientController.updatePatient);
router.delete('/:id', verifyToken, checkRoles(['admin']), patientController.deletePatient);
router.get('/:id/appointments', verifyToken, checkRoles(['admin', 'patient', 'dentist']), patientController.getPatientAppointments);

module.exports = router;
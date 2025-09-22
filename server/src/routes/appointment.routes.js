const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');
const { verifyToken, checkRoles } = require('../middlewares/auth.middleware');

router.get('/', verifyToken, checkRoles(['admin', 'patient', 'dentist']), appointmentController.getAllAppointments);
router.post('/', verifyToken, checkRoles(['patient']), appointmentController.createAppointment);
router.get('/:id', verifyToken, checkRoles(['admin', 'patient', 'dentist']), appointmentController.getAppointmentById);
router.put('/:id', verifyToken, checkRoles(['admin', 'patient', 'dentist']), appointmentController.updateAppointment);
router.delete('/:id', verifyToken, checkRoles(['admin', 'patient', 'dentist']), appointmentController.deleteAppointment);
router.get('/by-date', verifyToken, checkRoles(['admin']), appointmentController.getAppointmentsByDate);

module.exports = router;
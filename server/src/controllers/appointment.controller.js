const Appointment = require('../models/appointment.model');
const Patient = require('../models/patient.model');
const Dentist = require('../models/dentist.model');
const User = require('../models/user.model');

const removePassword = (data) => {
    if (Array.isArray(data)) {
        return data.map(item => {
            if (item.user) {
                const { password, ...userWithoutPassword } = item.user;
                return { ...item, user: userWithoutPassword };
            }
            return item;
        });
    } else if (data && data.user) {
        const { password, ...userWithoutPassword } = data.user;
        return { ...data, user: userWithoutPassword };
    }
    return data;
};

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAllWithDetails();
        const appointmentsWithoutPassword = removePassword(appointments);
        res.status(200).json({
            success: true,
            data: appointmentsWithoutPassword,
            message: 'Appointments retrieved successfully'
        });
    } catch (error) {
        console.error('Error getting all appointments:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByIdWithDetails(id);
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }
        const appointmentWithoutPassword = removePassword(appointment);
        res.status(200).json({
            success: true,
            data: appointmentWithoutPassword,
            message: 'Appointment retrieved successfully'
        });
    } catch (error) {
        console.error('Error getting appointment by ID:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const createAppointment = async (req, res) => {
    try {
        const { patient_id, dentist_id, appointment_datetime } = req.body;
        if (!patient_id || !dentist_id || !appointment_datetime) {
            return res.status(400).json({
                success: false,
                message: 'Patient ID, Dentist ID, and appointment date/time are required'
            });
        }
        const newAppointment = await Appointment.create({ patient_id, dentist_id, appointment_datetime });
        res.status(201).json({
            success: true,
            data: newAppointment,
            message: 'Appointment created successfully'
        });
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { patient_id, dentist_id, appointment_datetime } = req.body;
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }
        await Appointment.update(id, { patient_id, dentist_id, appointment_datetime });
        res.status(200).json({
            success: true,
            message: 'Appointment updated successfully'
        });
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }
        await Appointment.delete(id);
        res.status(200).json({
            success: true,
            message: 'Appointment deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const getAppointmentsByDate = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({
                success: false,
                message: 'Date is required (format: YYYY-MM-DD)'
            });
        }
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid date format. Use YYYY-MM-DD'
            });
        }
        const appointments = await Appointment.findByDateWithDetails(date);
        const appointmentsWithoutPassword = removePassword(appointments);
        res.status(200).json({
            success: true,
            data: appointmentsWithoutPassword,
            message: `Appointments for ${date} retrieved successfully`
        });
    } catch (error) {
        console.error('Error getting appointments by date:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const getMyAppointments = async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;
        let appointments;

        if (userRole === 'patient') {
            const patient = await Patient.findByUserId(userId);
            appointments = await Appointment.findByPatientIdWithDetails(patient.id);
        } else if (userRole === 'dentist') {
            const dentist = await Dentist.findByUserId(userId);
            appointments = await Appointment.findByDentistIdWithDetails(dentist.id);
        } else {
            return res.status(403).json({
                success: false,
                message: 'Access denied. You are not a patient or dentist.'
            });
        }

        const appointmentsWithoutPassword = removePassword(appointments);
        res.status(200).json({
            success: true,
            data: appointmentsWithoutPassword,
            message: 'My appointments retrieved successfully'
        });
    } catch (error) {
        console.error('Error getting my appointments:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = {
    getAllAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsByDate,
    getMyAppointments
};
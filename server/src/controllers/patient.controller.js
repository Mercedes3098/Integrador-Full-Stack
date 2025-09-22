const Patient = require('../models/patient.model');
const User = require('../models/user.model');
const Appointment = require('../models/appointment.model');
const bcrypt = require('bcryptjs');

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

const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findAllWithUserData();
        const patientsWithoutPassword = removePassword(patients);
        res.status(200).json({
            success: true,
            data: patientsWithoutPassword,
            message: 'Patients retrieved successfully'
        });
    } catch (error) {
        console.error('Error getting all patients:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const getPatientById = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByIdWithUserData(id);
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }
        const patientWithoutPassword = removePassword(patient);
        res.status(200).json({
            success: true,
            data: patientWithoutPassword,
            message: 'Patient retrieved successfully'
        });
    } catch (error) {
        console.error('Error getting patient by ID:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const createPatient = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and password are required'
            });
        }
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Email already exists'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword, role: 'patient' });
        const newPatient = await Patient.create({ user_id: newUser.id });
        const patientWithUser = { ...newPatient, user: { ...newUser, password: undefined } };
        res.status(201).json({
            success: true,
            data: patientWithUser,
            message: 'Patient created successfully'
        });
    } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }
        const updatedFields = { name, email, password };
        const user = await User.findById(patient.user_id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User associated with patient not found'
            });
        }
        if (password) {
            updatedFields.password = await bcrypt.hash(password, 10);
        }
        await User.update(user.id, updatedFields);
        res.status(200).json({
            success: true,
            message: 'Patient updated successfully'
        });
    } catch (error) {
        console.error('Error updating patient:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }
        await Patient.delete(id);
        await User.delete(patient.user_id);
        res.status(200).json({
            success: true,
            message: 'Patient deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting patient:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const getPatientAppointments = async (req, res) => {
    try {
        const { id } = req.params;
        const appointments = await Appointment.findByPatientIdWithDetails(id);
        const appointmentsWithoutPassword = removePassword(appointments);
        res.status(200).json({
            success: true,
            data: appointmentsWithoutPassword,
            message: 'Patient appointments retrieved successfully'
        });
    } catch (error) {
        console.error('Error getting patient appointments:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const getMyProfile = async (req, res) => {
    try {
        if (req.user.role !== 'patient') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Only for patients'
            });
        }
        const patient = await Patient.findByUserIdWithUserData(req.user.id);
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient profile not found'
            });
        }
        const patientWithoutPassword = removePassword(patient);
        res.status(200).json({
            success: true,
            data: patientWithoutPassword,
            message: 'Patient profile retrieved successfully'
        });
    } catch (error) {
        console.error('Error getting patient profile:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = {
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient,
    getPatientAppointments,
    getMyProfile
};
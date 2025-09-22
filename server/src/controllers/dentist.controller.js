const Dentist = require('../models/dentist.model');
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

const getAllDentists = async (req, res) => {
    try {
        const dentists = await Dentist.findAllWithUserData();
        const dentistsWithoutPassword = removePassword(dentists);
        res.status(200).json({
            success: true,
            data: dentistsWithoutPassword,
            message: 'Dentists retrieved successfully'
        });
    } catch (error) {
        console.error('Error getting all dentists:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const getDentistById = async (req, res) => {
    try {
        const { id } = req.params;
        const dentist = await Dentist.findByIdWithUserData(id);
        if (!dentist) {
            return res.status(404).json({
                success: false,
                message: 'Dentist not found'
            });
        }
        const dentistWithoutPassword = removePassword(dentist);
        res.status(200).json({
            success: true,
            data: dentistWithoutPassword,
            message: 'Dentist retrieved successfully'
        });
    } catch (error) {
        console.error('Error getting dentist by ID:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const createDentist = async (req, res) => {
    try {
        const { name, email, password, specialty } = req.body;
        if (!name || !email || !password || !specialty) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, password, and specialty are required'
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
        const newUser = await User.create({ name, email, password: hashedPassword, role: 'dentist' });
        const newDentist = await Dentist.create({ user_id: newUser.id, specialty });
        const dentistWithUser = { ...newDentist, user: { ...newUser, password: undefined } };
        res.status(201).json({
            success: true,
            data: dentistWithUser,
            message: 'Dentist created successfully'
        });
    } catch (error) {
        console.error('Error creating dentist:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const updateDentist = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, specialty } = req.body;
        const dentist = await Dentist.findById(id);
        if (!dentist) {
            return res.status(404).json({
                success: false,
                message: 'Dentist not found'
            });
        }
        const updatedFields = { name, email, password };
        if (password) {
            updatedFields.password = await bcrypt.hash(password, 10);
        }
        await User.update(dentist.user_id, updatedFields);
        await Dentist.update(id, { specialty });
        res.status(200).json({
            success: true,
            message: 'Dentist updated successfully'
        });
    } catch (error) {
        console.error('Error updating dentist:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const deleteDentist = async (req, res) => {
    try {
        const { id } = req.params;
        const dentist = await Dentist.findById(id);
        if (!dentist) {
            return res.status(404).json({
                success: false,
                message: 'Dentist not found'
            });
        }
        await Dentist.delete(id);
        await User.delete(dentist.user_id);
        res.status(200).json({
            success: true,
            message: 'Dentist deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting dentist:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const getAppointmentsByDate = async (req, res) => {
    try {
        const { date, dentistId } = req.query;
        if (!date || !dentistId) {
            return res.status(400).json({
                success: false,
                message: 'Date and dentistId are required'
            });
        }
        const appointments = await Appointment.findByDateAndDentistWithDetails(date, dentistId);
        const appointmentsWithoutPassword = removePassword(appointments);
        res.status(200).json({
            success: true,
            data: appointmentsWithoutPassword,
            message: `Appointments for ${date} and dentist ${dentistId} retrieved successfully`
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

const getDentistsBySpecialty = async (req, res) => {
    try {
        const { specialty } = req.query;
        if (!specialty) {
            return res.status(400).json({
                success: false,
                message: 'Specialty is required'
            });
        }
        const dentists = await Dentist.findBySpecialtyWithUserData(specialty.trim());
        const dentistsWithoutPassword = removePassword(dentists);
        res.status(200).json({
            success: true,
            data: dentistsWithoutPassword,
            message: `Dentists with specialty '${specialty}' retrieved successfully`
        });
    } catch (error) {
        console.error('Error getting dentists by specialty:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const getSpecialties = async (req, res) => {
    try {
        const specialties = await Dentist.getDistinctSpecialties();
        res.status(200).json({
            success: true,
            data: specialties,
            message: 'Specialties retrieved successfully'
        });
    } catch (error) {
        console.error('Error getting specialties:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const getMyProfile = async (req, res) => {
    try {
        if (req.user.role !== 'dentist') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Only for dentists'
            });
        }
        const dentist = await Dentist.findByUserIdWithUserData(req.user.id);
        if (!dentist) {
            return res.status(404).json({
                success: false,
                message: 'Dentist profile not found'
            });
        }
        const dentistWithoutPassword = removePassword(dentist);
        res.status(200).json({
            success: true,
            data: dentistWithoutPassword,
            message: 'Dentist profile retrieved successfully'
        });
    } catch (error) {
        console.error('Error getting dentist profile:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = {
    getAllDentists,
    getDentistById,
    createDentist,
    updateDentist,
    deleteDentist,
    getAppointmentsByDate,
    getDentistsBySpecialty,
    getSpecialties,
    getMyProfile
};
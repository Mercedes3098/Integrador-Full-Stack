const User = require('../models/user.model');
const Patient = require('../models/patient.model');
const Dentist = require('../models/dentist.model');

const removePassword = (users) => {
    if (Array.isArray(users)) {
        return users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
    } else if (users) {
        const { password, ...userWithoutPassword } = users;
        return userWithoutPassword;
    }
    return users;
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        const usersWithoutPassword = removePassword(users);
        res.status(200).json({
            success: true,
            data: usersWithoutPassword,
            message: 'Users retrieved successfully'
        });
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const userWithoutPassword = removePassword(user);
        res.status(200).json({
            success: true,
            data: userWithoutPassword,
            message: 'User retrieved successfully'
        });
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        await User.update(id, { name, email, role });
        res.status(200).json({
            success: true,
            message: 'User updated successfully'
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        await User.delete(id);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const getUsersByRole = async (req, res) => {
    try {
        const { role } = req.params;
        const validRoles = ['patient', 'dentist', 'admin'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role. Must be: patient, dentist, or admin'
            });
        }
        const users = await User.findByRole(role);
        const usersWithoutPassword = removePassword(users);
        res.status(200).json({
            success: true,
            data: usersWithoutPassword,
            message: `Users with role ${role} retrieved successfully`
        });
    } catch (error) {
        console.error('Error getting users by role:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUsersByRole
};
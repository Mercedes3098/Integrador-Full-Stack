const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  });
};

const register = async (req, res) => {
  try {
    const { name, email, password, role, specialty } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, password, and role are required'
      });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email is already in use.'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });

    if (role === 'patient') {
      await Patient.create({ user_id: newUser.id });
    } else if (role === 'dentist') {
      if (!specialty) {
        return res.status(400).json({
          success: false,
          message: 'Specialty is required for dentists.'
        });
      }
      await Dentist.create({ user_id: newUser.id, specialty });
    }

    const token = generateToken(newUser);
    const userWithoutPassword = removePassword(newUser);

    res.status(201).json({
      success: true,
      token,
      data: userWithoutPassword,
      message: 'User registered successfully!'
    });

  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed. Wrong password.'
      });
    }

    const token = generateToken(user);
    const userWithoutPassword = removePassword(user);

    res.status(200).json({
      success: true,
      token,
      data: userWithoutPassword,
      message: 'Authentication successful!'
    });

  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect old password.'
      });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updatePassword(user.id, newHashedPassword);

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

const logout = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

const verifyToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const userWithoutPassword = removePassword(user);

    res.status(200).json({
      success: true,
      data: {
        user: userWithoutPassword
      },
      message: 'Token is valid'
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  register,
  login,
  verifyToken,
  changePassword,
  logout
};
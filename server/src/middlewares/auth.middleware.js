const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.'
        });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Invalid token.'
        });
    }
};

const checkRoles = (roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({
            success: false,
            message: 'You do not have permission to perform this action.'
        });
    }
    next();
};

const checkOwnership = (model) => async (req, res, next) => {
    const { id } = req.params;
    const resourceId = parseInt(id);
    if (isNaN(resourceId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID.'
        });
    }
    try {
        const resource = await model.findById(resourceId);
        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found.'
            });
        }
        if (req.user.id !== resource.user_id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to access this resource.'
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message
        });
    }
};

module.exports = {
    verifyToken,
    checkRoles,
    checkOwnership
};
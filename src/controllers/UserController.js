const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

// GENERATE USER TOKEN
const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret, { expiresIn: '7d' });
}

// REGISTER USER AND SIGN IN
const register = async (req, res) => {
    res.send('Registrado');
}

module.exports = {
    register,
}
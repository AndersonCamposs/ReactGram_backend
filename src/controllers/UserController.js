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
    
    const { name, email, password } = req.body

    // CHECK IF USER EXISTS 
    const user = await User.findOne({ email });

    if (user) {
        return res.status(422).json({ errors: ['Já existe um usuário registrado com este e-mail'] });
    }

    // GENERATE PASSWORD HASH
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // CREATE USER
    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    })

    // IF USER WAS CREATED SUCCESSFULY, RETURN THE JSON WEB TOKEN
    if (!newUser) {
        return res.status(422).json({ errors: ['Houve algum erro na criação de usuário. Tente novamente mais tarde.'] })
    }
    
    return res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })
}

module.exports = {
    register,
}
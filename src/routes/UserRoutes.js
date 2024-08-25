const express = require('express');
const router = express.Router();

// CONTROLLER
const { register } = require("../controllers/UserController");

// MIDDLEWARES
const validate = require('../middlewares/handleValidation');
const {userCreateValidation} = require('../middlewares/userValidations');

// ROUTES
router.post('/register', userCreateValidation(), validate, register);

module.exports = router;
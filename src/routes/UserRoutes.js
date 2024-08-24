const express = require('express');
const router = express.Router();

// CONTROLLER
const { register } = require("../controllers/UserController");

// ROUTES
router.post('/register', register);

module.exports = router;
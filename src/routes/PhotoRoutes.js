const express = require("express");
const router = express.Router();
//CONTROLLER

// MIDDLEWARES
const { photoInsertValidator } = require("../middlewares/photoValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
// ROUTES

module.exports = router;

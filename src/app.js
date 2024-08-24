const express = require('express');
const path = require('path');
const cors = require('cors');
const { env } = require('process');

require('dotenv').config();

const port = process.env.PORT;

const app = express();

// CONFIG JSON AND FORM DATA RESPONSE
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// SOLVE CORS
app.use(cors({credentials: true, origin: "http://localhost:5173"}));

// UPLOAD DIRECTORY
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

// DATABASE CONFIG
require('./config/db.js');

// ROUTES 
const router = require('./routes/Router');
app.use(router);

app.listen(port);
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

// ROUTES 
const router = require('./routes/Router');
app.use(router);

app.listen(port);
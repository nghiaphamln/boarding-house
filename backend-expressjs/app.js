require('dotenv').config();

const express = require('express');
const database = require('./config/database.config');

const app = express();
database.ConnectDatabase().then(r => r);


module.exports = app;

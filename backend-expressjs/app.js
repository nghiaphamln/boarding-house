require('dotenv').config();

const express = require('express');
const database = require('./config/database.config');
const HandleError = require('./middleware/handleError.middleware');
const NotFound = require('./middleware/notFound.middleware');
const Log = require('./middleware/log.middleware');

const app = express();
database.ConnectDatabase().then(r => r);

app.set('trust proxy', true)
app.use(Log);
app.use(HandleError);
app.use(NotFound);

module.exports = app;

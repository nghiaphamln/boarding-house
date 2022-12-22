require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes');
const {ConnectDatabase} = require('./config/database.config');
const HandleError = require('./middleware/handleError.middleware');
const NotFound = require('./middleware/notFound.middleware');
const Log = require('./middleware/log.middleware');

const app = express();

ConnectDatabase().then(r => r);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.set('trust proxy', true)
app.use(Log);

routes(app);

app.use(NotFound);
app.use(HandleError);

module.exports = app;

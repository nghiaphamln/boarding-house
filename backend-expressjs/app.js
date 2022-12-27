const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const useragent = require('express-useragent');
const cors = require('cors');
const routes = require('./routes');
const {ConnectDatabase} = require('./config/database.config');
const HandleError = require('./middleware/handleError.middleware');
const NotFound = require('./middleware/notFound.middleware');
const Log = require('./middleware/log.middleware');

// require('dotenv').config({path: path.resolve('D:/Project/boarding-house/backend-expressjs/.env')});
require('dotenv').config();

const app = express();

ConnectDatabase().then(r => r);

app.use(cors());
app.use(useragent.express());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.set('trust proxy', true)
app.use(Log);

routes(app);

app.use(NotFound);
app.use(HandleError);

module.exports = app;

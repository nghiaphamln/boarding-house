const Auth = require('../middleware/auth.middleware');

const routes = (app) => {
  const homeRoute = require('./home.route');
  const authRoute = require('./auth.route');

  app.use('/123', Auth, homeRoute);
  app.use('/auth', authRoute);
}

module.exports = routes;

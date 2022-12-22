const routes = (app) => {
  const homeRoute = require('./home.route');
  const authRoute = require('./auth.route');

  app.use('/', homeRoute);
  app.use('/auth', authRoute);
}

module.exports = routes;

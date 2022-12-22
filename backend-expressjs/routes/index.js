const routes = (app) => {
  const homeRoute = require('./home.route');

  app.use('/', homeRoute);
}

module.exports = routes;

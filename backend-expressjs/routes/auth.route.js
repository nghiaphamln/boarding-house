const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');

router
    .post('/register', AuthController.Register);

module.exports = router;

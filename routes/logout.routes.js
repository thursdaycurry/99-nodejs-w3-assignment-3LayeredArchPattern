const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/login.controller');
const loginController = new LoginController();

router.delete('/', loginController.logout); // Logout sharing Login controller..

module.exports = router;

const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

router.post('/sign-up', authController.signUp);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;
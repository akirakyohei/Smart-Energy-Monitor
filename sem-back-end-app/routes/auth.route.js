const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const verifySignup = require("../middlewares/verifySignUp.middleware");

router.post('/signup-customer', verifySignup.checkDuplicateUsernameOrEmail, authController.signupCustomer);

router.post('/signin', authController.signin);

module.exports = router;
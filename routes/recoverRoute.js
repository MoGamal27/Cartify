const express = require('express');
const router = express.Router();
const resetPassword = require('../controller/resetPassword');
const forgotPassword = require('../controller/forgotPassword')
// POST route for resetting password
router.post('/reset-password', resetPassword);
router.post('/forgot-password',forgotPassword)
module.exports = router;
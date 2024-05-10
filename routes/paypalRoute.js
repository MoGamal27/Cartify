const express = require('express');
const router = express.Router();
const paypalCtrl = require('../controller/paymentController');

router.get("/buy" , paypalCtrl.createPayment);

module.exports = router
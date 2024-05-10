const express = require('express')
const order = require('../controller/orderController')
const {verifyJwt} = require('../middleware/verifyJwt')
const router = express.Router();

router.post('/orders',verifyJwt,order.createNewOrder)
router.get('/orders/:id',verifyJwt,order.getOrderById)


module.exports = router;
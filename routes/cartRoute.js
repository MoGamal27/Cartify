const express = require('express')
const cart = require('../controller/cartController')
const {verifyJwt} = require('../middleware/verifyJwt')
const router = express.Router();

router.post('/cart',verifyJwt,cart.addNewItems)
router.get('/cart/:id',verifyJwt,cart.getCartItem)


module.exports = router;
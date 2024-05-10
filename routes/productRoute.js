const express = require('express')
const product = require('../controller/productController')
const {verifyJwt} = require('../middleware/verifyJwt')
const router = express.Router();


router.get('/products',product.getAllProducts)
router.get('/products/:id',product.getOneProduct)


module.exports = router;
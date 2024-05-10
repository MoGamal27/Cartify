const Product = require('../model/productDb')
const asyncHandler = require('express-async-handler')
const appError = require('../utils/appError')
const httpStatusText = require('../utils/httpStatusText')
const redisClient = require('../redis'); 

const getAllProducts = asyncHandler(async (req, res) => {
    const query = req.query;

    const limit = parseInt(query.limit) || 10;
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * limit;

    redisClient.get(`products:${page}:${limit}`, async (err, cachedProducts) => {
        if (err) {
            console.error('Redis error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (cachedProducts) {
            return res.json({ status: httpStatusText.SUCCESS, data: { products: JSON.parse(cachedProducts) } });
        } else {
            try {
                const products = await Product.find({}, { "__v": false }).limit(limit).skip(skip);

                redisClient.set(`products:${page}:${limit}`, JSON.stringify(products));

                return res.json({ status: httpStatusText.SUCCESS, data: { products } });
            } catch (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    });
});


const getProduct = asyncHandler(async (req, res, next) => {
    const productId = req.params.productId;

    redisClient.get(`product:${productId}`, async (err, cachedProduct) => {
        if (err) {
            console.error('Redis error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (cachedProduct) {
            return res.json({ status: httpStatusText.SUCCESS, data: { product: JSON.parse(cachedProduct) } });
        } else {
            try {
                const product = await Product.findById(productId);
                if (!product) {
                    const error = appError.create('Product not found', 404, httpStatusText.FAIL);
                    return next(error);
                }

                redisClient.set(`product:${productId}`, JSON.stringify(product));

                return res.json({ status: httpStatusText.SUCCESS, data: { product } });
            } catch (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    });
});

module.exports = {
    getAllProducts,
    getProduct
}
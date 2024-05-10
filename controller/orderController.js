const Order = require('../model/cartDb')
const asyncHandler = require('express-async-handler')
const appError = require('../utils/appError')
const httpStatusText = require('../utils/httpStatusText')

const createOrder = asyncHandler(async (req,res) =>{
       
     const {userId, productId, quantity, subtotal} = req.body;

     try{
        const cart = await Cart.save({
           userId,
           productId,
           quantity,
           subtotal 
        })
        res.status(201).json({ status: httpStatusText.SUCCESS, data: { cart: cart } });
     }catch(e){
        res.status(500).json({ status: httpStatusText.ERROR, message: 'Failed to add cart' });
     }
})

const getCart = asyncHandler(async (req,res) =>{
    const userId = req.params.userId
    try{
       const cart = await Cart.find({ where: { userId } });
       res.status(201).json({ status: httpStatusText.SUCCESS, data: { cart: cart } });
    }catch(e){
       res.status(500).json({ status: httpStatusText.ERROR, message: 'Failed to get cart' });
    }
})

module.exports = {
    addCart,
    getCart
}
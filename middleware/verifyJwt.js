const jwt = require('jsonwebtoken')
require('dotenv').config()
function verifyJwt(req,res,next){

   const authHeader = req.headers['Authorization'] || req.headers['authorization']
    
   if(!authHeader){
    res.status(401).json({error:'not authorize'})
   }

   const token = authHeader.split(' ')[1];
     
    try{
      const currentUser = jwt.verify(token, process.env.JWT_SECRET)
      req.currentUser = currentUser
      next()
    }catch(e){
      res.status(500).json(e)
    }
}
module.exports = {verifyJwt}
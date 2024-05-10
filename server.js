const express = require('express');
const bodyParser = require('body-parser');

const routeAuth = require('./routes/routeAuth')

const routeProduct = require('./routes/productRoute')
const routeOrder = require('./routes/orderRoute')
const routeCart = require('./routes/cartRoute')
const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use('/',routeAuth,routeProduct,routeOrder,routeCart);
app.use('/auth',routeAuth);


app.listen(4000,()=>{
    console.log('listining port 4000');
})
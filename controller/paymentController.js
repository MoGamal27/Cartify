const paypalService = require('../services/paypalServices');


exports.createPayment = (req , res) => {

    // create payment object 
    const payment = {
        "intent": "authorize",
        "payer": {
            "payment_method": "paypal"
        }, 
        "redirect_urls": {
            "return_url": "http://127.0.0.1:4000/success",
            "cancel_url": "http://127.0.0.1:4000/err"
        },
        "transactions": [{
            "amount": {
                "total": 39.00,
                "currency": "USD"
            },
            "description": " a book on mean stack "
        }]
    }

    paypalService.createPaypalPayment(payment).then((transaction)=>{
        console.log("Create Payment Response");
        console.log("transaction : " + JSON.stringify(transaction));
        const transactionId = transaction.id; 
        console.log("id : " + transactionId);
    
        res.redirect("/success")
    })
   .catch((err)=>{
        console.log( err ); 
        res.redirect("/err")
        throw error;
   })
}
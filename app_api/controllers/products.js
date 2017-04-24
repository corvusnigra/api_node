var mongoose = require('mongoose');
var Prod = mongoose.model('Product');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.productsList = function (req, res) {
    Prod
        .find({})
        .exec((err, products)=> {
        if(!products){

            sendJSONresponse(res, 404, {
                "message": "Products not found"
            });
            return;

        } else if(err){

            sendJSONresponse(res, 404, err);
            return;

        }
        else if(products.length < 1){

            sendJSONresponse(res, 404,{
                "message": "Products = 0"
            });
            return;
        }

        sendJSONresponse(res, 200, products);

    })
};


module.exports.productsCreate = function (req, res) {

    Prod
        .create({
            name: req.body.name,
            price: req.body.price
        }, (err, product) => {

            if(err){
                console.log(err);
                sendJSONresponse(res, 400, err);
            } else {
                console.log(product);
                sendJSONresponse(res, 201, product)
            }

        })

};

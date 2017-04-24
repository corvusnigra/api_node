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

module.exports.productsReadOne = function (req, res) {

    if(req.params && req.params.productid) {

        Prod
            .findById(req.params.productid)
            .exec((err, product)=> {
                if(!product){

                    sendJSONresponse(res, 404, {
                        "message": "productid not found"
                    });

                    return;
                } else if(err){
                    sendJSONresponse(res, 404, err);
                    return;
                }

                sendJSONresponse(res, 200, product)

            })

    } else {
        sendJSONresponse(res, 404, {
            "message": "No product in request"
        })
    }
};

module.exports.productsUpdateOne = function (req, res) {

    if(req.params && req.params.productid) {

        Prod
            .findById(req.params.productid)
            .exec((err, product)=> {
                if(!product){

                    sendJSONresponse(res, 404, {
                        "message": "productid not found"
                    });

                    return;
                } else if(err){
                    sendJSONresponse(res, 404, err);
                    return;
                }

                product.name = req.body.name;
                product.price = req.body.price;

                product.save((err, product)=> {
                   if(err){
                       sendJSONresponse(res, 400, err);
                   } else {
                       sendJSONresponse(res, 200, product);
                   }
                });

            })

    } else {
        sendJSONresponse(res, 404, {
            "message": "No product in request"
        })
    }
};


module.exports.productsDeleteOne = function (req, res) {

        var productid = req.params.productid;

        if(productid){

            Prod
                .findByIdAndRemove(productid)
                .exec((err, product)=> {
                    if(err){
                        sendJSONresponse(res, 404, err);
                    } else {
                        sendJSONresponse(res, 204, null)
                    }
                })

        } else {
            sendJSONresponse(res, 404, {
                "message": "No productid"
            })
        }
};
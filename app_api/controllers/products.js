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

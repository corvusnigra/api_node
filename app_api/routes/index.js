var express = require('express');

var router = express.Router();
var ctrlProduct = require('../controllers/products');


router.get('/products', ctrlProduct.productsList);
router.post('/products', ctrlProduct.productsCreate);
router.get('/products/:productid', ctrlProduct.productsReadOne);
router.put('/products/:productid', ctrlProduct.productsUpdateOne);
router.delete('/products/:productid', ctrlProduct.productsDeleteOne);


module.exports = router;
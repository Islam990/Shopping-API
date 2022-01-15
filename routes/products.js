var express = require('express');
var router = express.Router();
var Product = require('../models/Product')

router.get('/', (req, res, next) => {
    // get all products
})

router.post('/addProduct', (req, res, next) => {
    // add new product
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    })

    product.save()
        .then(doc => {
            res.status(200).json({
                message: "product added Successfully"
            })
        })
        .catch(err => {
            res.status(404).json({
                message: err.message
            })
        })
})

module.exports = router;

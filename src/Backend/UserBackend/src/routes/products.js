const router = require('express').Router();
let Product = require('../models/products');

router.get('/getProducts', (req, res, next) => {
    Product.find({}, (err, result) => {
        if (err) return next(err);

        let data = {
            status: 'success',
            code: 200,
            data : result
        };

        res.json(data);
    })
});

module.exports = router;
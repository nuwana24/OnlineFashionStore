import User from "../models/user";
import Order from "../models/orders";
const router = require('express').Router();

//adding item to the cart
router.post("/addToCart", (req, res) => {

    console.log(req.body.userId);

    User.findOne({_id: req.body.userId}
    ,(err, userInfo) => {

        let duplicate = false;

        userInfo.Cart.forEach((cart) => {
            if(cart.id === req.body.productId){
                duplicate = true;
            }
        });

        if(duplicate){
            User.findOneAndUpdate(
                {_id: req.body.userId, "Cart.id": req.body.productId},
                {$inc: {"Cart.$.quantity": 1}},
                {new: true},
                () => {
                    if(err) return res.json({success:false, err});
                    res.status(200).json(userInfo.Cart)
                }
            )
        } else {
            User.findOneAndUpdate({_id: req.body.userId},
                {
                    $push:{
                        Cart : {
                            id: req.body.productId,
                            name : req.body.name,
                            price: req.body.price,
                            img: req.body.img,
                            quantity: 1,
                            discount: req.body.discount
                        }
                    }
                },
                {new:true},
                (err, userInfo) => {
                    if(err) return res.json({success:false, err});
                    res.status(200).json(userInfo.Cart)
                }
            )
        }
    })
});

//getting values from the cart
router.get('/getCart', (req, res) => {

    if(req.query.userId !== undefined){
        User.findOne({_id: req.query.userId}
            ,(err, userInfo) => {
                res.json(userInfo.Cart);
            })
    }
});

router.post('/increment', (req, res) => {

    User.findOne({_id: req.body.userId}
    ,(err, userInfo) => {
            User.findOneAndUpdate(
                {_id: req.body.userId, "Cart.id": req.body.productId},
                {$inc: {"Cart.$.quantity": 1}},
                {new: true},
                () => {
                    if(err) return res.json({success:false, err});
                    res.status(200).json(userInfo.Cart)
                }
            )
    })
});

router.post('/decrement', (req, res) => {

    User.findOne({_id: req.body.userId}
        ,(err, userInfo) => {
            User.findOneAndUpdate(
                {_id: req.body.userId, "Cart.id": req.body.productId},
                {$inc: {"Cart.$.quantity": -1}},
                {new: true},
                () => {
                    if(err) return res.json({success:false, err});
                    res.status(200).json(userInfo.Cart)
                }
            )
        })
});

router.get('/removeItem', (req, res) => {

    User.findOneAndUpdate(
        {_id: req.query.userId},
        {
            "$pull":
                {"Cart" : {"id" : req.query.productId}}
        },
        {new : true},
        (err, userInfo) => {
            if(err) return res.json({success:false, err});
            res.status(200).json(userInfo.Cart)
    }
    )
});

router.get('/clearCart', (req, res) => {

    User.findOneAndUpdate(
        {_id: req.query.userId},
        {
            "$set": {
                "Cart": []
            },
        },
        {new : true},
        (err, userInfo) => {
            if(err) return res.json({success:false, err});
            res.status(200).json(userInfo.Cart)
        });
});

router.post('/checkout', (req, res) => {
    const userId = req.body.userId;
    const userName = req.body.username;
    const orders = req.body.Cart;

    const newOrder = Order({userId, userName, orders});
    newOrder.save();

    User.findOneAndUpdate(
        {_id: userId},
        {
            "$set": {
                "Cart": []
            },
        },
        {new : true},
        (err, userInfo) => {
            if(err) return res.json({success:false, err});
            res.status(200).json(userInfo.Cart)
        });

});

router.get('/getOrder', (req, res,next) => {
    Order.find({}, (err, result) => {
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
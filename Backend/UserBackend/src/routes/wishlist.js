import User from "../models/user";
const router = require('express').Router();

router.post("/addToWishList", (req, res) => {

    User.findOne({_id: req.body.userId}, (err, user) => {

        let duplicate = false;

        user.WishList.forEach((wishList) => {
            if(wishList.id === req.body.productId){
                duplicate = true;
            }
        });

        if(!duplicate){
            User.findOneAndUpdate({_id: req.body.userId},
                {
                    $push : {
                        WishList: {
                            id : req.body.productId,
                            name : req.body.name,
                            // img : req.body.img,
                            price : req.body.price,
                            description : req.body.description,
                            discount : req.body.discount,
                            material : req.body.material
                        }
                    }
                },
                {new:true},
                (err, user) => {
                    if(err) return res.json({success:false, err});
                    res.status(200).json(user.WishList)
                }
            )
        }

    })
});

router.get('/getWishList', (req, res) => {

    if(req.query.userId !== undefined){
        User.findOne({_id: req.query.userId}
            ,(err, user) => {
                res.json(user.WishList);
            })
    }
});

router.get('/rmoveWishList', (req, res) => {

    User.findOneAndUpdate(
        {_id: req.query.userId},
        {
            "$pull":
                {"WishList" : {"id" : req.query.productId}}
        },
        {new : true},
        (err, userInfo) => {
            if(err) return res.json({success:false, err});
            res.status(200).json(userInfo.WishList)
        }
    )
});

module.exports = router;
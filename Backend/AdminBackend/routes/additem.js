const bodyParser = require('body-parser');

const express = require('express');
const router = require('express').Router();
const mongoose = require('mongoose');
const {AddItem} = require('../Models/addItem.model');
const multer = require('multer');
const path = require('path');
let Category = require('../Models/Category.model');
const fs = require('fs');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.get('/', async (req, res)=>{
   await AddItem.find()
        .then(itemlist => res.json(itemlist))
        .catch(err => res.status(400).json('Error: ' + err));
});
const storage = multer.diskStorage({
    // destination: '../../../public/uploads/',
    destination: function(req, file, cb) {
        cb(null, '../FrontEnd/public/uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

var upload = multer({ storage: storage, fileFilter: imageFilter }).single('file');
router.post('/add',async (req, res, next) => {
    try{
        await upload(req,res,err =>{
            if (err) return res.json({success: false, err})
            console.log(req.file.path);
            const item = new AddItem();
            item.img.data = fs.readFileSync(req.file.path);
            item.img.contentType = "image/png";
            item.category = req.body.category;
            item.name = req.body.name;
            item.description = req.body.description;
            item.price = req.body.price;
            item.quantity = req.body.quantity;
            item.size = req.body.size;
            item.meterial = req.body.meterial;

            console.log(item.img);
            // const addItem = new AddItem({img, category, name, description, price, quantity, size, meterial});
            item.save((err) =>{
                if(err) return res.status(400).json('error : ' +err)
                return res.status(200).json('success');
            })

        })
    }catch (e) {
        console.log(e);
    }

});
router.route('/:id').get((req, res) => {
    AddItem.findById(req.params.id)
        .then(itemlist => res.json(itemlist))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {

            AddItem.findById(req.params.id)

                .then(itemlist => {
                    // itemlist.img = req.file.filename;
                    itemlist.category = req.body.category;
                    itemlist.name = req.body.name;
                    itemlist.description = req.body.description;
                    itemlist.price = req.body.price;
                    itemlist.quantity = req.body.quantity;
                    itemlist.size = req.body.size;
                    itemlist.meterial = req.body.meterial;
                    itemlist.discount = req.body.discount;
                    itemlist.comment = req.body.comment;
                    itemlist.rate = req.body.rate;


                    itemlist.save()
                        .then(() => res.json('Item updated!'))
                        .catch(err => res.status(400).json('Error: ' + err));
                    alert("Item Added")
                })
                .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/pushComment').post(function (req,res){

    AddItem.findOneAndUpdate(
        { _id: req.body._id },
        {
            $push: {
                comment: req.body.comment
            },
        }
    )
        .then(doc => {
            res.send(doc);
        })
        .catch(err => {
            console.error(err);
        });
});

router.route('/pushRates').post(function (req,res){

    AddItem.findOneAndUpdate(
        { _id: req.body._id },
        {
            $push: {
                rating: req.body.rating
            },
        }
    )
        .then(doc => {
            res.send(doc);
        })
        .catch(err => {
            console.error(err);
        });
});

router.route('getAllCategories').get(function (req,res){
    Category.find(function (err,categories) {
        if (!err){
            res.json(categories);
        }else {
            res.status(400).send('Error');
        }

    })
});

router.route('/:id').delete((req, res) => {
    AddItem.findByIdAndDelete(req.params.id)
        .then(() => res.json('Item Deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
})
module.exports = router;

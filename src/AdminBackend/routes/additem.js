const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AddItem = require('../Models/addItem.model');
const multer = require('multer');
const path = require('path');
let Category = require('../Models/Category.model');
// import y from './../../../public/uploads';






// Image model
// const AddItem = mongoose.model('AddItem');
// const ctrlImage = require('../controllers/file.controller');

router.get('/', (req, res)=>{
    AddItem.find()
        .then(itemlist => res.json(itemlist))
        .catch(err => res.status(400).json('Error: ' + err));
});
const storage = multer.diskStorage({
    // destination: '../../../public/uploads/',
    destination: function(req, file, cb) {
        cb(null, '../../public/uploads/');
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

router.post('/add',(req, res, next) => {
    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('file');
    upload(req, res , function (err) {
        if (!err) {
            console.log(req.file)
            const img = req.file.filename;
            const category = req.body.category;
            const name = req.body.name;
            const description = req.body.description;
            const price = req.body.price;
            const quantity = req.body.quantity;
            const size = req.body.size;
            const meterial = req.body.meterial;

            const addItem = new AddItem({img, category, name, description, price, quantity, size, meterial});

            addItem.save()
                .then(() => res.json('Item added!'))
                .catch(err => res.status(400).json('Error: ' + err));
        }
    })
})
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

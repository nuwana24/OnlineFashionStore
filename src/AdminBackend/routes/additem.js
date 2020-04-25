const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AddItem = require('../Models/addItem.model');
const multer = require('multer');
const path = require('path');
let Category = require('../Models/Category.model');





// Image model
// const AddItem = mongoose.model('AddItem');
// const ctrlImage = require('../controllers/file.controller');

router.get('/', (req, res)=>{
    res.status(200).json({
        message: 'Handling GET requests to /addItem'
    });
});
const storage = multer.diskStorage({
    // destination: '../../../public/uploads/',
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// const upload = multer({
//     storage: storage
//
// })
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
router.route('getAllCategories').get(function (req,res){
    Category.find(function (err,categories) {
        if (!err){
            res.json(categories);
        }else {
            res.status(400).send('faild');
        }

    })
})

module.exports = router;

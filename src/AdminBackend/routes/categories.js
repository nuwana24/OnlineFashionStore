const router = require('express').Router();
let Category = require('../Models/Category.model');

router.route('/').get((req, res) => {
    Category.find()
        .then(categories => res.json(categories))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
    const category = req.body.category;
    const subCategories = req.body.subCategories;
    const description = req.body.description;


    const newCategory = new Category({category,subCategories,description});

    newCategory.save()
        .then(() => res.json('Category added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Category.findById(req.params.id)
        .then(categories => res.json(categories))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then(() => res.json('Category deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Category.findById(req.params.id)
        .then(category => {
            category.category = req.body.category;
            category.subCategories =  req.body.subCategories;
            category.description = req.body.description;

            category.save()
                .then(() => res.json('Category updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
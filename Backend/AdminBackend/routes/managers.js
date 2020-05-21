const bodyParser = require('body-parser');

const express = require('express');
const router = require('express').Router();
let Manager = require('../Models/Manager.model');


const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.route('/').get((req, res) => {
    Manager.find()
        .then(managers => res.json(managers))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email= req.body.email;
    const gender = req.body.gender;
    const password  = req.body.password ;
    // const rePassword  = req.body.rePassword ;
    const dateOfBirth = Date.parse(req.body.dateOfBirth);
    const Address = req.body.Address;
    const Address2 = req.body.Address2;
    const city  = req.body. city ;
    // const states = req.body.states;
    const zip = Number(req.body.zip);



    // const newManager = new Manager({fname,lname,email,gender,password,rePassword,DOB,Address,Address2,city,states,zip});
    const newManager = new Manager({firstName,lastName,email,gender,password,dateOfBirth,Address,Address2,city,zip});

    newManager.save()
        .then(() => res.json('Store Manager added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/:id').get((req, res) => {
    Manager.findById(req.params.id)
        .then(managers => res.json(managers))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Manager.findByIdAndDelete(req.params.id)
        .then(() => res.json('Manager deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Manager.findById(req.params.id)
        .then(managers => {
            managers.firstName = req.body.firstName;
            managers.lastName = req.body.lastName;
            managers.email = req.body.email;
            managers.gender = req.body.gender;
            managers.password = req.body.password;
            // managers.rePassword = req.body.rePassword;
            managers.dateOfBirth = Date.parse(req.body.dateOfBirth);
            managers.Address = req.body.Address;
            managers.Address2 = req.body.Address2;
            managers.city = req.body.city;
            // managers.states = req.body.states;
            managers.zip = req.body.zip;

            managers.save()
                .then(() => res.json('Manager updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
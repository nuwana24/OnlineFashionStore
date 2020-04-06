const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.get('/', (req, res) => res.render('Welcome'));

//sample way
router.get('/dashbord', ensureAuthenticated, (req, res) =>
    res.render('dashbord', {
        email: req.user.email
    }))
module.exports = router;
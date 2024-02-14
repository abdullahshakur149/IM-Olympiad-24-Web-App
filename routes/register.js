const express = require('express');
const router = express.Router();
const {newRegistration} = require('../controllers/registration.controller')

router.get('/', (req, res, next) => {
    res.render('register', {response_msg : req.flash("response_msg")[0]});
});

router.post('/new-registration', newRegistration, (req, res, next) => {
    console.log(req.body);
    res.redirect('/register');
});

module.exports = router;

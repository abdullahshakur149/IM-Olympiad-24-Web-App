// login.js
const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/', (req, res, next) => {
    res.render('admin/login', {});
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
}));

module.exports = router;

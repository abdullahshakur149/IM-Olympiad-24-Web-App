// login.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('admin/login', {});
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;

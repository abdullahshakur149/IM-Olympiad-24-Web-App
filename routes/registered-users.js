const express = require('express');
const router = express.Router();
const webAuth = require('../config/webAuth');

//Authentication
router.use(webAuth.checkAuthenticated);


// Route for rendering registered users page
router.get('/', (req, res, next) => {
    res.render('admin/registeredUsers', {});
});

module.exports = router;

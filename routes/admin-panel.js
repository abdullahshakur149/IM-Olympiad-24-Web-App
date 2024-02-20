const express = require('express');
const router = express.Router();
const webAuth = require('../config/webAuth');

//Authentication
router.use(webAuth.checkAuthenticated);

router.get('/', (req, res, next) => {
    res.render('admin/admin-panel', {});
});

// Route for rendering registered users page
router.get('/registered-users', (req, res, next) => {
    res.render('admin/registeredUsers', {});
});

module.exports = router;

const express = require('express');
const router = express.Router();
const webAuth = require('../config/webAuth');

//Authentication
router.use(webAuth.checkAuthenticated);

router.get('/', (req, res, next) => {
    res.render('admin-panel', {});
});

module.exports = router;

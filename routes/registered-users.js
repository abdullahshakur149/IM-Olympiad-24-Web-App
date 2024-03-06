const express = require('express');
const router = express.Router();
const {getRegisteredUsers, getLocalRegisteredUsers} = require('../controllers/registration.controller');
const {getRegisteredUserDetail, getImage} = require('../controllers/registeredUsers.controller')
const path = require('path')
const webAuth = require('../config/webAuth');

//Authentication
router.use(webAuth.checkAuthenticated);


// Route for rendering registered users page
router.get('/', getRegisteredUsers, getLocalRegisteredUsers, (req, res, next) => {
    res.render('admin/registeredUsers', {});
});

// Route for rendering registered users page
router.get('/user-details/:user_id', getRegisteredUserDetail, (req, res, next) => {
    res.render('admin/userDetails');
});

router.get('/user-details/:folder/:sub_folder/:image_name', getImage);

module.exports = router;

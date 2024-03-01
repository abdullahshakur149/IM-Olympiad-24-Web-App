const express = require('express');
const router = express.Router();
const webAuth = require('../config/webAuth');
const { getTotalViews } = require('../controllers/views.controller')
const { getRegisteredUsersCount } = require('../controllers/registration.controller');
const {getRegisteredUsersData} = require('../controllers/registration.controller')



// Authentication
router.use(webAuth.checkAuthenticated);


router.get('/', getTotalViews, async (req, res, next) => {
    try {
        const registrationsCount = await getRegisteredUsersCount();
        const { count, registrations } = await getRegisteredUsersData();


        res.render('admin/admin-panel', { registrationsCount, count, registrations });
    } catch (err) {
        // Handle errors
        console.error("Error fetching registered users count:", err);
        res.status(500).send('Internal Server Error');
    }
});




module.exports = router;

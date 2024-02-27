const express = require('express');
const router = express.Router();
const webAuth = require('../config/webAuth');
const { getRegisteredUsersToday } = require('../controllers/registration.controller');

// Authentication
router.use(webAuth.checkAuthenticated);

const { getRegisteredUsersCount } = require('../controllers/registration.controller');

router.get('/', async (req, res, next) => {
    try {
        const registrationsCount = await getRegisteredUsersCount();
        res.render('admin/admin-panel', { registrationsCount });
    } catch (err) {
        // Handle errors
        console.error("Error fetching registered users count:", err);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('thankyou', {});
});

module.exports = router;

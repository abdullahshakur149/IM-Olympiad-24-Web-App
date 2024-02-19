var express = require('express');
var router = express.Router();
const passport = require('passport');
const {checkNotAuthenticated} = require('../config/webAuth')

router.get('/', checkNotAuthenticated, function(req, res, next) {
  res.render('admin/login', {error : req.flash("error")[0]});
});

router.post('/', passport.authenticate('local', {
<<<<<<< Updated upstream
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
=======
  successRedirect: '/admin-panel',
  failureRedirect: '/login',
  failureFlash: true
>>>>>>> Stashed changes
}));

//To logout
router.delete('/', function(req, res, next){
  req.logout(function(err) {

  if (err) {
    return next(err); 
  }
  
  res.redirect('/login');
  });
});

module.exports = router;
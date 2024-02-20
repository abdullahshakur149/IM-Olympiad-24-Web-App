module.exports = {
    // If user is logged in, allow access to the private page
    checkAuthenticated: function (req, res, next){
        if (req.isAuthenticated()){
            return next();
        }
        res.redirect('/login');
    },
    
    // If user goes to the login page and is already logged in, redirect to admin panel page
    checkNotAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            return res.redirect('/admin-panel');
        }
        next();
    }
};

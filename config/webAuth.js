module.exports = {
    //if user is logged then allow to private page
    checkAuthenticated: function (req, res, next){
        if (req.isAuthenticated()){
            return next()
        }
        res.redirect('/login');
    },
    
    //if user goes to login page and is already logged in, redirect to admin panel page
    checkNotAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            return res.redirect('/admin-panel');
        }
        next();
    }
};
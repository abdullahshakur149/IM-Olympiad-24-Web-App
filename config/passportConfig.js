const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/userModel')


function  initialize(passport){

    const authenticateUser = async (user_name, password, done) =>{

        const user =  await User.findOne({user_name:user_name});

        if(user == null){
            // console.log('User authentication(email) error');
            return done(null, false, {message: 'No user with that user name'})//message goes to 'error' in flash
        }

        try {
            if(await bcrypt.compare(password, user.password)){
                // console.log('bcrypt match');
                
                return done(null, user);
                
            } else {
                // console.log('bcrypt mismatch');
                return done(null, false, {message:'Password incorrect!'})
            }
        } catch(e){
            // console.log('bcrypt error');
            return done(e);

        }
    }
    
    passport.use(new LocalStrategy({
        usernameField: 'user_name',//req.body.email
        passwordField: 'password'},//req.body.password
        authenticateUser));

    passport.serializeUser((user, done)=> {
        return done(
            null,
            user.id)
    });

    passport.deserializeUser(async (id, done)=>{
        return done(
            null,
            await User.findById(id));
    })
}



module.exports = initialize;
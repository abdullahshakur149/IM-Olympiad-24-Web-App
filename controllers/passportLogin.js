const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("Attempting to authenticate user:", username);
        User.findOne({ username: username }, function (err, user) {
            if (err) {
                console.error("Error finding user:", err);
                return done(err);
            }
            if (!user) {
                console.log("User not found:", username);
                return done(null, false, { message: 'Incorrect username.' });
            }
            console.log("User found:", user.username);
            if (!user.verifyPassword(password)) {
                console.log("Incorrect password for user:", user.username);
                return done(null, false, { message: 'Incorrect password.' });
            }
            console.log("User authenticated successfully:", user.username);
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    console.log("Serializing user:", user.username);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log("Deserializing user ID:", id);
    User.findById(id, function(err, user) {
        if(err) {
            console.error("Error deserializing user:", err);
            return done(err);
        }
        console.log("Deserialized user:", user.username);
        done(null, user);
    });
});

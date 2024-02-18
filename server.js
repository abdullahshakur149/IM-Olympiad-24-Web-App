require('dotenv').config();
const express = require('express');
const colors = require('colors');
const connectDB = require('./database/connection');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const User = require('./models/user'); // Assuming you have a User model

// Passport configuration
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const app = express();

// Connect to the database
connectDB();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'da43gy-ca92-42f1-9041'
}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // for flash messages

// Routes setup
const indexRoute = require('./routes/index');
const venueRoute = require('./routes/venue');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');

app.use('/', indexRoute);
app.use('/venue', venueRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);

// Error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).render('internalerror');
});

// 404
app.use((req, res, next) => {
    res.status(404).render('404');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Your Server is listening on PORT ${PORT}`.bold.red);
    console.log('Server url:', `http://localhost:${PORT}`.green);
});

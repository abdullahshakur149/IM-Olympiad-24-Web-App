require('dotenv').config();
const express = require('express');
const colors = require('colors');
const connectDB = require('./database/connection');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const MongoStore = require('connect-mongo')
const viewsCounter = require('./middleware/viewsCounter')
const app = express();


//connect to database
connectDB();

//initialize passport
const initializePassport = require('./config/passportConfig');
initializePassport(passport);


// middlewares
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
    secret:'da43gy-ca92-42f1-9041',
    saveUninitialized: false,
    resave:false,
    proxy : process.env.NODE_ENV === 'production' ? true : false,
    cookie:{
      secure : process.env.NODE_ENV === 'production' ? true : false,
      httpOnly : true
    },
    store : MongoStore.create({
      mongoUrl: process.env.MONGO_URL, //YOUR MONGODB URL
      ttl: 24 * 60 * 60, // 24 hours live time / Each time a user interacts with the server, its session expiration date is refreshed.
      autoRemove: 'native'
    })
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // for flash messages


// Routes
const indexRoute = require('./routes/index');
const venueRoute = require('./routes/venue');
// const registerRoute = require('./routes/register')
const galleryRoute = require('./routes/gallery');
const adminPanelRoute = require('./routes/admin-panel')
const registeredUsersRoute = require('./routes/registered-users')
const loginRoute = require('./routes/login');
const thankyouRoute = require('./routes/thankyou')


//custom middlewares
app.use(viewsCounter);

app.use('/', indexRoute);
app.use('/venue', venueRoute);
app.use('/gallery', galleryRoute);
app.use('/register', thankyouRoute);
app.use('/admin-panel', adminPanelRoute);
app.use('/registered-users', registeredUsersRoute);
app.use('/login', loginRoute);
app.use('/logout', loginRoute);



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

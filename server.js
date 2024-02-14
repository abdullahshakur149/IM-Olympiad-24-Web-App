require('dotenv').config();

const express = require('express');
const colors = require('colors');

//const connectDB = require('./database/connection');
require('dotenv').config(); 

const flash = require('connect-flash')
const session = require('express-session')
const connectDB = require('./database/connection');

const app = express();

//connectDB();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret:'da43gy-ca92-42f1-9041'
}))
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(flash());//for flash messages

// Routes
const indexRoute = require('./routes/index');
const performerRoute = require('./routes/performer');
const aboutRoute = require('./routes/about');
const programRoute = require('./routes/program');
const venueRoute = require('./routes/venue');
const contactRoute = require('./routes/contact');
const registerRoute = require('./routes/register')



app.use('/', indexRoute);
app.use('/performers', performerRoute);
app.use('/about', aboutRoute);
app.use('/program', programRoute);
app.use('/venue', venueRoute);
app.use('/contact', contactRoute);
app.use('/register', registerRoute);


// Error handling
//handle internal errors e.g Database, missing file etc
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500);
    res.render('internalerror')
})

// 404
//handle requests to non-existent pages
app.use((req, res, next) => {
    res.status(404);
    res.render('404');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Your Server listening on PORT ${PORT}`.bold.red);
    console.log('Server url:', `http://localhost:${PORT}`.green);
});

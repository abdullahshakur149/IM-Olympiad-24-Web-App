const express = require('express');
const colors = require('colors');
const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
const indexRoute = require('./routes/index');
const performerRoute = require('./routes/performer');
const aboutRoute = require('./routes/about');
const programRoute = require('./routes/program');
const venueRoute = require('./routes/venue');
const contactRoute = require('./routes/contact');
const registerRoute = require('./routes/register');
const imStudentRegister = require('./routes/imsStudentRegister')
const OutsiderRegister = require('./routes/OutsiderRegister')



app.use('/', indexRoute);
app.use('/performers', performerRoute);
app.use('/about', aboutRoute);
app.use('/program', programRoute);
app.use('/venue', venueRoute);
app.use('/contact', contactRoute);
app.use('/register', registerRoute);
app.use('/imsregister', imStudentRegister);
app.use('/outsiderregister', OutsiderRegister);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Your Server listening on PORT ${PORT}`.bold.red);
});

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');

require("dotenv").config();

const discordRouter = require('./routes/discord')
const playerRouter = require('./routes/player');
const itemsRouter = require('./routes/items');
const wishlistRouter = require('./routes/wishlist');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

console.log(process.env.NODE_ENV);

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'react-spa/build/')));
app.use(express.static(path.join(__dirname, 'react-spa/build/static')));

// api routes
app.use('/api/discord', discordRouter);
app.use('/api/player', playerRouter);
app.use('/api/items', itemsRouter);
app.use('/api/wishlist', wishlistRouter);

// catch 404 and forward to error handler
app.use('/api/*', (req, res, next) => {
    next(createError(404));
});

// front-end, every request should be resovled in react router if call is not to api endpoint
app.get('*', (req, res) => {
    console.log('route: *')
    res.sendFile(path.join(__dirname+'/react-spa/build/index.html'));
});

// error handler
app.use(function (err, req, res, next) {

    //log error to console
    console.error(err);

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.statusCode || 500);
    res.render('error');
});

// mongoose major update flags
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

mongoose.connect(process.env.MONGODB_URI)
    .then(result => {
        console.log('successfully connected to db!');
    })
    .catch(err => {
        console.log(err);
        process.exit(0);
    })

module.exports = app;

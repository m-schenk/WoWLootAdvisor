const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');

require("dotenv").config();

const discordRouter = require('./routes/discord')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const itemsRouter = require('./routes/items');
const wishlistRouter = require('./routes/wishlist');
const playerRouter = require('./routes/player');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(
    session( {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    } )
);

console.log(process.env.NODE_ENV);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'react-spa/build')));

// routes
app.use('/', indexRouter);
app.use('/api/discord', discordRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/wishlist', wishlistRouter);
app.use('/player', playerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

    //log error to console
    console.error(err);

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status( err.statusCode || 500 );
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

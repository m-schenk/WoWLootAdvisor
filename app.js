const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const session = require('express-session');
const passport = require('passport')
const connectEnsureLogin = require('connect-ensure-login');
const MongoStore = require('connect-mongo')(session);

require("dotenv").config();

const discordRouter = require('./routes/discord')
const playerRouter = require('./routes/player');
const itemsRouter = require('./routes/items');
const wishlistRouter = require('./routes/wishlist');

const discordStrategy = require('./strategies/discordStrategies');

const app = express();

// print mode Production or Dev
console.log(process.env.NODE_ENV);

// Connect to mongodb - set both mongoose major update flags
mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(result => {
        console.log('successfully connected to db!');
    })
    .catch(err => {
        console.log(err);
        process.exit(0);
    })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// session & middlewares
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: 'auto',
            httpOnly: true,
            maxAge: 3600000
        },
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/login.html'))
})

app.get('/forbidden', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/forbidden.html'))
});

// api discord  login route
app.use('/api/discord/', discordRouter);

// from here on all routes are protected
app.use('', connectEnsureLogin.ensureLoggedIn('/forbidden'), express.static(path.join(__dirname, 'react-spa/build/')));
app.use('', connectEnsureLogin.ensureLoggedIn('/forbidden'), express.static(path.join(__dirname, 'react-spa/build/static')));

//api routes
app.use('/api/player', connectEnsureLogin.ensureLoggedIn('/forbidden'), playerRouter);
app.use('/api/items', connectEnsureLogin.ensureLoggedIn('/forbidden'), itemsRouter);
app.use('/api/wishlist', connectEnsureLogin.ensureLoggedIn('/forbidden'), wishlistRouter);



// catch 404 and forward to error handler
app.use('/api/*', (req, res, next) => {
    next(createError(404, `page not found, url: ${req.originalUrl} might be invalid`));
});

// front-end, every request should be resovled in react router if call is not to api endpoint
app.get('*', connectEnsureLogin.ensureLoggedIn('/forbidden') ,(req, res) => {
    res.sendFile(path.join(__dirname+'/react-spa/build/index.html'));
});

// error handler
app.use(function (err, req, res, next) {

    //log error to console
    console.error(err);

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    if(err.statusCode === 403) {
        res.redirect('http://raegae.maarten.ch:3000/forbbiden')
    } else {
        // render the error page
        res.status(err.statusCode || 500);
        res.render('error');
        }
});

module.exports = app;

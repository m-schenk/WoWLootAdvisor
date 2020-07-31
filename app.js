const dotenv = require("dotenv").config();
const mongoDb = require('./private/mongoDbUri');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');

const discordRouter = require('./routes/discord')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const itemsRouter = require('./routes/items');
const wishlistRouter = require('./routes/wishlist');
const playerRouter = require('./routes/player');

var app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var cors = require('cors');
const { Server } = require('http');
const { exit } = require('process');


//app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(
  session({
    secret: '!&@#$%349t7834h7u9',
    resave: false,
    saveUninitialized: false,
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/discord', cors(), discordRouter);
app.use('/users',  usersRouter);
app.use('/items',  itemsRouter);
app.use('/wishlist', cors(),  wishlistRouter);
app.use('/player',  playerRouter);



// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  next(createError(404));
//});

// error handler
app.use(function(err, req, res, next) {

    console.error(err);

    const message = err.message;
    const status = err.statusCode || 500;
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    //res.status(err.status || 500);
    
    res.status(status).json({ message: message });
    //res.render('error');
});

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

mongoose.connect(mongoDb.getURI())
.then(result => {
  console.log('successfully connected to db!');
})
.catch(err => {
  console.log(err);
  process.exit(0);
})


module.exports = app;

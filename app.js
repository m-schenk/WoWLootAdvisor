const mongoDb = require('./private/mongoDbUri');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
const mongoose = require('mongoose');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let itemsRouter = require('./routes/items');

var app = express();
var cors = require('cors');
const { Server } = require('http');
const { exit } = require('process');

if (process.env.NODE_ENV === 'development') {
    
    app.use(cors());
}
console.log(process.env.NODE_ENV);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', cors(), usersRouter);
app.use('/items', cors(), itemsRouter);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //the wildcard stands for the domain which should be allowed to access the API
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE') //define allowed operations
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization') //this allows to set the content type in client side javascript -> necessary because content-type needs to be set to json, in order to properly communicate with the API
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
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

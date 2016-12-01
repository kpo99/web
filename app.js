var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var test = require('./generator/test');



var index = require('./routes/index');
var users = require('./routes/auth');
var adminRouter = require('./routes/adminRouter');
var userRouter = require('./routes/userRouter');
var apiRouter = require('./routes/api');


var app = express();

mongoose.connect('mongodb://kpo99:qwerty12345@ds035985.mlab.com:35985/repogendb');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'secret'}));
require('./config/passport')(app);


/* Routers */
app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

// Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

// Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'content-type');

// Set to true if you need the website to include cookies in  requests
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.static(path.join(__dirname, 'frontend')));

app.use('/', index);
app.use('/auth', users);
app.use('/admin', adminRouter);
app.use('/profile', userRouter);
app.use('/api', apiRouter);


app.all("/*", (req, res, next) => {
  res.sendFile("index.html", { root: __dirname + "/frontend" });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;

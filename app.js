var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

/* Templating libraries */
var ejs = require('ejs');
var hb  = require('express-handlebars');

/* A node.js module for parsing form data, especially file uploads. */
var formidable = require('express-formidable');
/* Node module for input rules */
var validator = require('express-validator');
/* Node module for session */
var session = require('express-session');

/* Include routes */
var routes = require('./routes/index');
var users  = require('./routes/users');
var polls  = require('./routes/polls');

/* Intialize the express app */
var app = express();

/* Handlebars templating */
app.set('views', path.join(__dirname, 'views-hb'));
app.engine('.hbs', hb({
  defaultLayout: 'default',
  extname: '.hbs',
  layoutsDir: 'views-hb/layouts',
  partialsDir: 'views-hb/partials'
}));
app.set('view engine', '.hbs');

/* EJS templating */
// app.set('views', path.join(__dirname, 'views-ejs'));
// app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Intialize the library for parse form data */
app.use(formidable.parse());

/* Initialize the sessions */
app.use(session({secret: 'ceclair', resave: true, saveUninitialized: true}));

app.use(function(req, res, next) {
  res.locals = {
    logged: req.session.auth,
    auth: req.session.user
  };
  next();
});

/* Intialize routing */
app.use('/', routes);
app.use('/users', users);
app.use('/polls', polls);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

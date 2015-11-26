var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var db, app, routes, users, sources, movies;
//var movieDownload = require('./batch/movieDownload');

MongoClient.connect('mongodb://localhost:27017/test', function(err, database) {
  db = database;
  console.log("Connected correctly to server.");
  initApp();  
});

app = express();

function initApp() {    
    routes = require('./routes/index');
    users = require('./routes/users');
    sources = require('./routes/sources');
    movies = require('./routes/movies')(db);
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.engine('html',require('ejs').renderFile);
    app.set('view engine', 'html');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use('/', routes);
    app.use('/users', users);
    app.use('/sources',sources);
    app.use('/movies',movies);
    app.use(express.static(path.join(__dirname, 'public')));

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });
}
//movieDownload.dailyJob.start();

module.exports = app;
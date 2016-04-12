var express = require('express')
    , cors = require('cors')
    , app = express();
var http = require('https');


app.use(cors());





app.get('/find/:id', function(req, res){

  console.log(req.params.id);

  var options = {
    host: 'openlibrary.org',
    path: '/api/books?bibkeys=ISBN:' + req.params.id + '&format=json&jscmd=data'

  };

  var callback = function(response) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      var parsedString = JSON.parse(str)["ISBN:" + req.params.id];
      
      res.json({
        title: parsedString.title,
        ISBN: parsedString.ISBN,
        subtitle: parsedString.subtitle,
        url: parsedString.url,
        number_of_pages: parsedString.number_of_pages
      });
    });

  };

  http.get(options, callback).end();

});


//////////////////////////////////////////
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(express.static(__dirname + '/'));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/////

app.use('/', routes);
app.use('/users', users);

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

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cores = require('cors');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

var app = express();

app.use(cores())

app.use(logger('dev'));

mongoose.connect('mongodb://localhost/Shopping-API', { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log("Connected failed")
    return
  }
  console.log("Connected succeed")
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message
  })
});

module.exports = app;

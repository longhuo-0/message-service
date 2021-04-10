const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet')
const rateLimit = require('express-rate-limit');

const indexRouter = require('./routes/index');
const messageRouter = require('./routes/messages');

const app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

if(process.env.NODE_ENV === 'development'){
  app.use(logger('dev'));
}
// helmet for security purpose
app.use(helmet());

// accept application/json only
app.use(express.json({limit: '1mb'}));

// disable ui
// app.use(express.static(path.join(__dirname, 'public')));

// limit each ip to 10 request per window (5 mins)
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10
})

app.use('/', indexRouter);
app.use('/api/v1/messages', messageRouter);

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
  res.json({
    err
  });
});

module.exports = app;

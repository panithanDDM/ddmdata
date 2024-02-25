var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const flash = require('connect-flash')
const expressSession = require('express-session')

const usersRouter = require('./routes/users-router');
const homeRouter = require('./routes/home-router')
const invenRouter = require('./routes/inventory-router')

//Middleware require
const redirectIfAuth = require('./middleware/redirectIfAuth')
const authChecker = require('./middleware/authChecker')





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// User flash for send error to page 
app.use(flash())
//use session for send  flash
app.use(expressSession({
  secret: 'DDM',
  saveUninitialized: true,
  resave: false
}))

// var for check user login
global.loggedIn = null

// collect user id in session
app.use('*', (req, res, next) => {
  loggedIn = req.session.userId
  next()
})




















app.use('/', usersRouter);
app.use('/home', homeRouter)
app.use('/inventory', invenRouter)






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
  res.render('error');
});

module.exports = app;

// Start server
const port = process.env.PORT || 4400

app.listen(port, () => {
  console.log(`Server is running on port ${port} http://localhost:${port}`)
})
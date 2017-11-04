var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan     = require("morgan");
var users = require('./routes/users');
var expressJwt = require('express-jwt');

var app = express();

// Gestion des headers
app.disable('x-powered-by');
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
process.env['JWT_SECRET'] = 'todo_keep_secret';
app.use(expressJwt({secret:process.env.JWT_SECRET}).unless({path:['/users/authenticate','/users/signin']}));
app.use(morgan("dev"));
// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler

app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({
        type: false,
        data: "Error occured: " + err
    });
});


module.exports = app;

//Load modules
const path = require('path');
const cors = require('cors');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mysql = require('mysql');
const routes = require('./routes/routes');
const express = require('express');
const config = require('./config/config');

const getDevApp = express();

//view engine setup
getDevApp.set('views', path.join(__dirname, 'views'));
getDevApp.set('view engine', 'ejs');

getDevApp.use(morgan('dev'));
getDevApp.use(express.json());
getDevApp.use(bodyParser.json());
getDevApp.use(cors());
getDevApp.use(bodyParser.urlencoded({ extended: false }));
getDevApp.use(cookieParser());

getDevApp.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
       res.sendStatus(200);
     }
     else {
       next();
     }
});
  
getDevApp.use(function(req, res, next) {
    global.connectionPool = mysql.createPool({
    connectionLimit :config.db_connection_limit,
    host         : config.db_host,
    user        : config.db_user,
    password    : config.db_password,
    database    : config.db_name,
    multipleStatements: true,
    });
    next();
});

getDevApp.use('/api/v1', routes);


// catch 404 and forward to error handler
getDevApp.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



// error handler
getDevApp.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.getDevApp.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = getDevApp;
const port = config.port;
getDevApp.listen(port, function(){
    console.log("getDev Book Store running on Port: " + port);
});
//Load modules
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dbUtility = require('./db/db_utility');
const routes = require('./routes/routes');
const express = require('express');
const session = require('express-session')
const config = require('./config/config');

const getDevApp = express();

getDevApp.use(session({
    secret: config.session_secret,
    resave: true,
    saveUninitialized: true
}));

//database connection
dbUtility.checkConnection().then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
})

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

getDevApp.use('/api/v1', routes);


// catch 404 and forward to error handler
getDevApp.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



// error handler
/* getDevApp.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.getDevApp.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
}); */

module.exports = getDevApp;
const port = config.port;
getDevApp.listen(port, function(){
    console.log("getDev Book Store running on Port: " + port);
});
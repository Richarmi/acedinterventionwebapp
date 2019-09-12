'use strict';
global.env = process.env.NODE_ENV || 'dev';
var connect = require('connect');
var express = require('express');
var _ = require('lodash');
var log4js = require('log4js');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dslog = require('./utils/dslog');
var utils = require('./utils/utils');
var serverConfigs = require('./configs/serverConfigs');
var favicon = require('serve-favicon');
var session = require('express-session');
//var db = require('./models');
//require('./controllers/emailSender');

var app = module.exports = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


/*
app.use(session({
    secret: 'acedIntervention is awesome',
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: new mongoStore({
        url: serverConfigs.dbConfig[global.env].host,
        mongoOptions: serverConfigs.sessionConfig[global.env]
    })
}));
*/


/*
 app.use(function(req,res,next){
 var forwardedProtocol = req.headers['x-forwarded-proto'];
 if (!forwardedProtocol || forwardedProtocol === 'https') {
 next();
 } else {
 //res.redirect('http://'+req.headers.host+req.url,302);
 next();
 }
 });
 */

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.set('view engine', 'html');
// dist folder has all the public files
app.set('views', __dirname + '/client/dist/');
app.set('view options', {
    layout: false
});
app.engine('html', require('ejs').renderFile);

app.use(express['static'](__dirname + '/../client/dist', {
    maxAge: 86400000
}));

//app.use(favicon(__dirname + '/../client/dist/images/favicons/favicon.ico'));


// this section renders the template partials
app.use(function(req,res,next) {
    if (req.url.indexOf('/partials') > -1) {
        // remove the first "/" from the req.url
        var urlPath = req.url.substr(1,req.url.length);
        res.render(urlPath)
    } else {
        next();
    }
});

app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

// configure logging
app.use(log4js.connectLogger(dslog.getLogger(), {level:'auto',format: ':remote-addr - :method :url :status - :user-agent - :content-length :response-time ms'}));


app.use(function (req,res,next){
 //console.log('session information')
 //console.dir(req.session.globals)
 //console.log('session information')
    console.log(req.url);
 next()
});


function NotFound(msg) {
    console.dir(msg)
    this.name = 'NotFound';
    Error.call(this, msg);
    //Error.captureStackTrace(this, arguments.callee);
}

// error handling
app.use(function(err, req, res, next){
    // if an error occurs Connect will pass it down
    // through these "error-handling" middleware
    // allowing you to respond however you like
    dslog.error(err)
    console.dir(err)
    if (err instanceof NotFound) {
        var error = {
            acedInterventionStatusCode : 404,
            acedInterventionStatusMessage : 'Resource not found'
        }
        utils.sendResponseForAPI(error,req,res,null);
    } else {
        var error = {
            acedInterventionStatusCode : 500,
            acedInterventionStatusMessage : 'An unexpected server error occurred'
        }
        utils.sendResponseForAPI(error,req,res,null);
    }
})


process.on('uncaughtException', function(err) {
    console.log((new Date())+"UNCAUGHT EXCEPTION **********************************************");
    console.log(err);
    console.log(err.stack);
    dslog.error('Uncaught Exception')
    dslog.error(err)
    dslog.error(err.stack)
    throw err;
});

process.on('exit', function(code) {
    console.log('About to exit with code:', code);
    dslog.error('About to exit with code');
    dslog.error(code)
});

// load routes
require('./routes/routeConfigs').configureRoutes(app)


//start app
app.listen(process.env.PORT || serverConfigs.runTimeConfig[global.env].port, null);
dslog.info('Running in ' + process.env.NODE_ENV + ' mode @ ' + serverConfigs.runTimeConfig[global.env].uri+':'+serverConfigs.runTimeConfig[global.env].port);
console.log('Running in ' + process.env.NODE_ENV + ' mode @ ' + serverConfigs.runTimeConfig[global.env].uri+':'+serverConfigs.runTimeConfig[global.env].port);


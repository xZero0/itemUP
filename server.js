#!/bin/env node
//  OpenShift sample Node application
//  This file have to clean any test code. Please, consider it.

var express     = require('express');
var http        = require('http');
var path        = require('path');
var favicon     = require('static-favicon');
var logger      = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser  = require('body-parser');
var flash       = require('connect-flash');
var util        = require('util');
var mongoose    = require('mongoose'); 
var passport    = require('passport');

var fs          = require('fs');

/**
 *  Define the sample application.
 */
var SampleApp = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;
        self.app       = express();

        // Database config =====================
        // =====================================
        self.configDB  = require('./config/database');  
        mongoose.connect(self.configDB.url);     // connect to mongoDB database on modulus.io

        
        // Database config =====================
        // =====================================
        require('./config/passport')(passport); // pass passport for configuration


        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };

    self.setupViewEngine = function() {
        // view engine setup
        self.app.set('views', path.join(__dirname, 'views'));
        self.app.set('view engine', 'jade');
    };

    self.setupApplication = function() {
        self.app.use(express.static(path.join(__dirname, 'public')));
        self.app.use(cookieParser());
        self.app.use(express.session({
            secret : 'keyboard cat'
        }));
        
        self.app.use(favicon());
        self.app.use(logger('dev'));
        self.app.use(express.json());
        self.app.use(express.urlencoded());

        // required for passport
        self.app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
        self.app.use(passport.initialize());
        self.app.use(passport.session()); // persistent login sessions
        self.app.use(flash()); // use connect-flash for flash messages stored in session
    };

    self.setupErrorHandler = function() {
        /// catch 404 and forwarding to error handler
        self.app.use(function(req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        /// error handlers

        // development error handler
        // will print stacktrace
        if (self.app.get('env') === 'development') {
            self.app.use(function(err, req, res, next) {
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user
        self.app.use(function(err, req, res, next) {
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
    };

    /**
     *  Populate the cache.
     */
    self.populateCache = function() {
        if (typeof self.zcache === "undefined") {
            self.zcache = { 'index.html': '' };
        }

        //  Local cache for static content.
        self.zcache['index.html'] = fs.readFileSync('./index.html');
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) { return self.zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.setupRoutes = function() {
        // self.routes = { };
        require('./server-routes')(self.app, passport);
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.setupViewEngine();
        self.setupApplication();
        self.setupRoutes();
        self.setupErrorHandler();
        self.setupTerminationHandlers();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();

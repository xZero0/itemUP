//server-routes.js

/**
 *  Initialize the server (express) and create the routes and register
 *  the handlers.
 */

var passport = require('passport');

var routes = require('./routes');
var users = require('./routes/user');

module.exports = function(app) {
    app.get('/', routes.index);

    // User authentication and information route
    app.get('/login', users.login);
    app.get('/signup', users.signup);
    app.get('/profile', users.profile);
    app.get('/logout', users.logout);

    // process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

};

//server-routes.js

/**
 *  Initialize the server (express) and create the routes and register
 *  the handlers.
 */

var routes = require('./routes');
var users = require('./routes/user');

module.exports = function(app, passport) {
    app.get('/', routes.index);

    // User authentication and information route
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/profile', isLoggedIn, users.profile);
    app.get('/logout', users.logout);

    // process the login form
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect : '#', // redirect to the secure profile section
        failureRedirect : '/signin', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
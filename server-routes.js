//server-routes.js

/**
 *  Initialize the server (express) and create the routes and register
 *  the handlers.
 */

var routes = require('./routes');
var account = require('./routes/account');

module.exports = function(app) {
    app.get('/', routes.index);

    app.get('/register', account.registerfrom);
    // app.post('/register', account.register);
    //app.get('/login', account.login);
    //app.post('/login', account.login);
};

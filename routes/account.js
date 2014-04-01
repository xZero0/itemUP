/* GET users listing. */

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var Account = require('../models/account');

exports.registerfrom = function(req, res){
    res.render('register', { });
};


exports.register = function(req, res){
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
    });
};

/* GET users listing. */


// LOGIN ===============================
// =====================================
exports.login = function(req, res){

    // render the page and pass in any flash data if it exists
    res.render('user_login', { message: 'loginMessage' }); 
};

// SIGNUP===============================
// =====================================
exports.signup = function(req, res){

    // render the page and pass in any flash data if it exists
    res.render('user_signup', { message: 'signupMessage' });
};


// PROFILE SECTION =====================
// =====================================
exports.profile = function(req, res){
    res.render('user_profile', {
        user : req.user // get the user out of session and pass to template
    });
};

// LOGOUT ==============================
// =====================================
exports.logout = function(req, res){
    req.logout();
    res.redirect('/');
};


// Route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

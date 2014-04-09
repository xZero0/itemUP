/* GET users listing. */
<<<<<<< HEAD
exports.list = function(req, res){
  res.send('respond with a resource');
};
=======


// LOGIN ===============================
// =====================================
exports.signin = function(req, res){

    // render the page and pass in any flash data if it exists
    res.render('user_signin', { message: req.flash('loginMessage') }); 
};

// SIGNUP===============================
// =====================================
exports.signup = function(req, res){

    // render the page and pass in any flash data if it exists
    res.render('user_signup', { message: req.flash('signupMessage') });
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

>>>>>>> refs/remotes/origin/master

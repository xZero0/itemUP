/* GET index home page. -*/

exports.index = function(req, res){
<<<<<<< HEAD
  res.render('index', { title: 'itemUP!' });
};
=======
    if (req.isAuthenticated()) {
        res.render('index', { 
            title: 'itemUP - The smart inventory management system',
            user : req.user // get the user out of session and pass to template
        });
    } else {
        res.render('index', { 
            title: 'itemUP - The smart inventory management system'
        });
    }
};
>>>>>>> refs/remotes/origin/master

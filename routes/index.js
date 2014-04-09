/* GET index home page. -*/

exports.index = function(req, res){
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

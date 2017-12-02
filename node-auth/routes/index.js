/*
* GET home page.
*/
exports.index = function(req, res){
    var message = 'Home';
  res.render('index.ejs',{user: req.session.user})};

/*
* GET home page.
*/

exports.index = function(req, res){
    var message = 'Home';
  res.render('index.ejs',{message: message})};

var moment = require('moment');
exports.login = function(req, res){
   var message = '';
   var sess = req.session;
 
   if(req.method == "POST"){
      var post  = req.body;
      var name = post.user_name;
      var pass = post.password;
    
      var sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";                          
      db.query(sql, function(err, results){      
         if(results.length){
            req.session.userId = results[0].id;
            req.session.user = results[0];
            console.log("Login id "+results[0].id);
            console.log("Login name is "+results[0]);
            res.redirect('/home/dashboard');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('login.ejs',{message: message});
         }
                
      });
   } else {
      res.render('login.ejs',{message: message});
   }        
};

exports.signup = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var fname= post.first_name;
      var lname= post.last_name;
      var name= post.user_name;
      var pass= post.password;
      
 
      var sql = "INSERT INTO `users`(`first_name`,`last_name`,`user_name`, `password`) VALUES ('" + fname + "','" + lname +  "','" + name + "','" + pass + "')";
 
      var query = db.query(sql, function(err, result) {
 
         message = "Your account has been successfully created. You can now log in!";
         res.render('login.ejs',{message: message});
      });
 
   } else {
      res.render('signup');
   }
};

exports.dashboard = function(req, res, next){
 var message = 'My profile';
 var user =  req.session.user;
 var userId = req.session.userId;

 if(userId == null || user == null){
   req.session.reset();
   res.redirect('/login');
   return;
 }

 var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";

    db.query(sql, function(err, results){
   
   // console.log(results);
    //console.log("DID GET THE RESULTS AND PRINTED");

    res.render('profile.ejs',{user : user});
   
 });
};

exports.logout = function (req, res){
  req.session.reset();
  res.redirect('/');
};


/***********************************************RECIPES ************************************************************/

exports.recipe_create_get = function(req, res){
  res.render('addRecipe.ejs',{user: req.session.user});
};
exports.recipe_create_post = function(req, res){
  var user =  req.session.user;
  var userId = req.session.userId;
  if(userId == null || user == null){
    req.session.reset();
    res.redirect('/login');
    return;
  }
  console.log("CREATE POST USER IS: "+user.first_name);
  console.log("CREATE POST USER ID IS: "+userId);
  //if not logged in can not add recipe (maybe session expired?)
  var post = req.body;
  var recipe_title = post.title;
  console.log("Title is: "+recipe_title);
  var img_link = post.imglink;
  console.log("Image link is: "+img_link);
  var category = post.dropdown;
  console.log("Category is: "+category);
  var ingredients = post.ingredtextarea;
  console.log("Ingredients are: "+ingredients);
  var howto = post.howtotextarea;
  console.log("How to is: "+howto);
  var radio = post.radio;
  var difficulty;
  if(radio=="0"){
     difficulty="Easy";
  }
  else {
    if(radio=="1")
      difficulty="Intermidiate";
    else {
      difficulty="Hard";
    }
  }
  console.log("Difficulty is: "+difficulty);
  var date = moment().format('MMMM Do YYYY, h:mm:ss a');
  var username=user.user_name;
  var sql = "INSERT INTO `recipes`(`user_id`,`user_name`,`title`,`imagelink`,`category`,`ingredients`,`howto`,`difficulty`,`date`) VALUES ('" + userId +"','" + username+"','"+recipe_title+"','"+img_link+"','"+category+"','"+ingredients+"','"+howto+"','"+difficulty+"','"+date+"')";
  var query=db.query(sql,function(err, results){
    if(err){
      console.log(err);
    }
      res.render('profile',{user:user});});
  };

  exports.recipe_detail = function (req, res){
    var recipe_id = req.params.id;
    console.log("Recipe id is: "+recipe_id);
    var user =  req.session.user;
    var userId = req.session.userId;
    if(userId == null || user == null){
      req.session.reset();
      res.redirect('/login');
      return;
    }
    var sql="SELECT * FROM `recipes` WHERE `id`='"+recipe_id+"'";  
    db.query(sql, function(err, results){   
      console.log("Results recipe title is: \n" + results[0].title);  
      if(results.length){
        res.render('myrecipe.ejs',{myrecipe:results[0],user:user});
      }
      else {
        res.send('Recipe does not exist');
      }
    });
  //  res.send("not implement yet recipe_detail");
  };

  exports.myrecipes_list = function (req, res){
    var user =  req.session.user;
    var userId = req.session.userId;
    console.log("MY RECIPES user: "+user.user_name);
    console.log("MY RECIPES userID: "+userId);
    if(userId == null || user == null){
      req.session.reset();
      res.redirect('/login');
      return;
    }
    var sql="SELECT * FROM `recipes` WHERE `user_id`='"+userId+"'";
    db.query(sql, function(err, results){  
      console.log("Found :"+results.length+" results");
      //if(err) console.log(err);    
      if(results.length){
        res.render('seemyrecipes.ejs',{myrecipes:results, user:user});
      }
      else {
        res.render('profile.ejs',{user:user});
        console.log("Did not find recipes in db");
      }
    });
  //  res.send("My recipes does not exist");
    //res.send("not implemented yet myrecipes_list");
  };

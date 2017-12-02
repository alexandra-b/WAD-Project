var moment = require('moment');
var async = require('async');

//Display list of all Recipes
exports.recipes_list = function (req, res){
  res.send("All recipes: not implemented yet");
};


//Display detail page for a specific Recipe
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
  console.log("user: " + user);
  console.log("userId:" + userId);

  var sql="SELECT * FROM `recipes` WHERE `id`='"+recipe_id+"'";  
  db.query(sql, function(err, results){   
    console.log("Results: \n" + results);  
    if(results.length){
      res.redirect('myrecipe',{myrecipe:results[0]},{user:user});
    }
    else {
      res.send('Recipe does not exist');
    }
  });
//  res.send("not implement yet recipe_detail");
};

//Display list of all Recipes from a certain user
exports.myrecipes_list = function (req, res){
  var user =  req.session.user;
  var userId = req.session.userId;
  console.log("MY RECIPES user: "+user);
  console.log("MY RECIPES userID: "+user);
  if(userId == null || user == null){
    req.session.reset();
    res.redirect('/login');
    return;
  }
  var sql="SELECT * FROM `recipes` WHERE `user_id`='"+userId+"'";
  db.query(sql, function(err, results){  
    //if(err) console.log(err);    
    if(results.length){
      res.render('seemyrecipes.ejs',{myrecipes:results},{user:user});
    }
    else {
      res.render('profile.ejs',{user:user});
      console.log("Did not find recipes in db");
    }
  });
  res.send("My recipes does not exist");
  //res.send("not implemented yet myrecipes_list");
};

//Display create recipe form on get
exports.recipe_create_get = function(req, res){
  res.render('addRecipe.ejs',{user: req.session.user});
};

//Handle recipe create on post
exports.recipe_create_post = function(req, res){
  message='';
  console.log("CREATE POST USER IS: "+req.session.user);
  console.log("CREATE POST USER ID IS: "+req.session.userID);
  //if not logged in can not add recipe (maybe session expired?)
  if(userId == null || user == null){
    req.session.reset();
    res.redirect('/login');
    return;
  }
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
  var username=user;
  var sql = "INSERT INTO `recipes`(`user_id`,`user_name`,`title`,`imagelink`,`category`,`ingredients`,`howto`,`difficulty`,`date`) VALUES ('" + userId +"','" + username+"','"+recipe_title+"','"+img_link+"','"+category+"','"+ingredients+"','"+howto+"','"+difficulty+"','"+date+"')";
  var query=db.query(sql,function(err, results){
    if(err){
      console.log(err);
    }
      res.render('profile',{user:user});});
  };
  //res.send("Not implemented yet");

//Display recipe instance delete form on get
exports.recipe_delete_get = function(req, res){
  res.send('Not implemented: Recipe delete GET');
};

//Handle recipe instance delete form on POST
exports.recipe_delete_post = function(req, res){
  res.send('Not implemented: Recipe delete POST');
};

//Display Recipe update form on get
exports.recipe_update_get = function(req, res){
  res.send('Not implemented: Recipe update GET');
};

//Handle Recipe update on post
exports.recipe_update_post = function(req, res){
  res.send('Not implemented: Recipe update POST');
};

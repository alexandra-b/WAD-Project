//Display list of all Recipes
exports.recipe_list = function (req, res){
  res.send('Not implemented yet: Recipes list');
};

//Display detail page for a specific Recipe
exports.recipe_detail = function (req, res){
  res.send('Not implemented yet: Recipe Detail: '+req.params.id);
};

//Display create recipe form on get
exports.recipe_create_get = function(req, res){
  res.render('addRecipe.ejs',{user: req.session.user});
};

//Handle recipe create on post
exports.recipe_create_post = function(req, res){
  res.send('Not implemented yet: Recipe create POST');
};

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

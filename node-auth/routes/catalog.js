var express = require('express');
var router = express.Router();
var moment = require('moment');
var recipe_controller = require ('../controllers/recipeController');

//var user_controller = require ('../controllers/userController');
//var comment_controller = require ('../controllers/commentController');

/* GET catalog home page. */
//router.get('/',);

/* GET request for creating a RECIPE. This must come before routes that display RECIPE (uses id)*/
router.get('/recipe/create',recipe_controller.recipe_create_get);

/* POST request for creating a RECIPE */
router.post('/recipe/create',recipe_controller.recipe_create_post);

/* GET request to delete RECIPE */
router.get('/recipe/:id/delete',recipe_controller.recipe_delete_get);

/* POST request to delete RECIPE */
router.post('/recipe/:id/delete',recipe_controller.recipe_delete_post);

/* GET request to update RECIPE */
router.get('/recipe/:id/update',recipe_controller.recipe_update_get);

/* POST request to update RECIPE */
router.post('/recipe/:id/update',recipe_controller.recipe_update_post);

/* GET request for one RECIPE */
router.get('/recipe/:id',recipe_controller.recipe_detail);

/*GET request to list all RECIPEs */
router.get('/allrecipes',recipe_controller.recipes_list);

/*GET request to list all my RECIPEs */
router.get('/myrecipes',recipe_controller.myrecipes_list);

module.exports = router;
/* ************************************************ */


/* GET request for creating a comment */

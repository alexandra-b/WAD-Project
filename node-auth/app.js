var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
//mine
var session = require('client-sessions');
//var recipe_controller = require('./controllers/recipeController');
//var catalog = require('./routes/catalog');
//mine
//var methodOverride = require('method-override');
var app = express();
var mysql   = require('mysql');
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : 'root',
              database : 'users_db'
            });

connection.connect();


global.db = connection;

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
//******
app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));
//*******MAIN PAGES ************/
app.get('/', routes.index);//call for main index page
app.get('/home', routes.index);//call for main index page

app.get('/signup', user.signup);//call for signup page
app.get('/login', (req,res) => {
  res.render('login',{message:'Login'});
}); //MY CALL LOGIN PAGE
app.post('/login', user.login);//call for login post
app.post('/signup', user.signup);//call for signup post
app.get('/home/logout',user.logout); //call for log out

app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
/* ********************************/
//app.use('/catalog',catalog);


/*******************RECIPE PAGES **************/

app.get('/recipe/create',user.recipe_create_get);
app.post('/recipe/create',user.recipe_create_post);
app.get('/recipe/:id',user.recipe_detail);
app.get('/myrecipes',user.myrecipes_list);



//Middleware
app.listen(8080, () => {
  console.log("Running on: 8080");
});

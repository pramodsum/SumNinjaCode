/**
 * Module dependencies.
 */

var express = require('express');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var csrf = require('lusca').csrf();
var methodOverride = require('method-override');

var _ = require('lodash');
var flash = require('express-flash');
var path = require('path');
var expressValidator = require('express-validator');
var connectAssets = require('connect-assets');

/**
 * Controllers (route handlers).
 */

var homeController = require('./controllers/home');
var quotesController = require('./controllers/quotes');
var tweetsController = require('./controllers/tweets');
var projectsController = require('./controllers/projects');
var photosController = require('./controllers/photos');
var aboutController = require('./controllers/about');
/**
 * API keys
 */

var secrets = require('./config/secrets');

/**
 * Create Express server.
 */

var app = express();

var hour = 3600000;
var day = hour * 24;
var week = day * 7;

/**
 * CSRF whitelist.
 */

var csrfExclude = ['/url1', '/url2'];

/**
 * Express configuration.
 */

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(connectAssets({
  paths: ['public/css', 'public/js'],
  helperContext: app.locals
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secrets.sessionSecret,
}));
app.use(flash());
app.use(function(req, res, next) {
  // CSRF protection.
  if (_.contains(csrfExclude, req.path)) return next();
  csrf(req, res, next);
});
app.use(function(req, res, next) {
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: week }));

/**
 * Main routes.
 */

app.get('/', homeController.index);
app.get('/about', aboutController.index);
app.post('/contact', aboutController.getContact);
app.post('/contact', aboutController.postContact);

app.get('/quotes', quotesController.index);
app.get('/photos', photosController.index);
//app.get('/tweets', tweetsController.index);
app.get('/projects', projectsController.index);
app.get('/projects/Mission-Demolition', projectsController.getMD);
// app.get('/projects/Legend-of-Zelda', projectsController.getZelda);
// app.get('/projects/Save-the-Dino', projectsController.getDino);
app.get('/travels', projectsController.getTravels);

/**
 * Poet routes
 */

var Poet = require('poet');

var poet = Poet(app, {
  postsPerPage: 3,
  posts: './_posts',
  metaFormat: 'json',
  routes: {
    '/posts/:post': 'posts/post',
    '/tags/:tag': 'posts/tag',
    '/:category': 'posts/category'
  }
});

poet.watch(function () {
    // watcher reloaded
}).init().then(function () {
    // Ready to go!
});

/**
 * Error Handler.
 */

// app.use(errorHandler());

// Handle 404
app.use(function(req, res) {
    res.status(400);
   res.render('404.jade', {title: '404: File Not Found'});
});

// Handle 500
app.use(function(error, req, res, next) {
    res.status(500);
   res.render('500.jade', {title:'500: Internal Server Error', error: error});
});

/**
 * Sitemap.xml
 */

app.get('/posts/sitemap.xml', function (req, res) {
  // Only get the latest posts
  var postCount = poet.helpers.getPostCount();
  var posts = poet.helpers.getPosts(0, postCount);
  res.setHeader('Content-Type', 'application/xml');
  res.render('sitemap', { posts: posts });
});

/**
 * Start Express server.
 */

app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;

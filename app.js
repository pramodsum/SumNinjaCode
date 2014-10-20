/**
 * Module dependencies.
 */

require('newrelic');

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

app.use(errorHandler());

// app.use(function(req, res, next){
//   res.status(404);
  
//   // respond with html page
//   if (req.accepts('html')) {
//     res.render('404', { url: req.url });
//     return;
//   }

//   // respond with json
//   if (req.accepts('json')) {
//     res.send({ error: 'Not found' });
//     return;
//   }

//   // default to plain-text. send()
//   res.type('txt').send('Not found');
// });

// // error-handling middleware, take the same form
// // as regular middleware, however they require an
// // arity of 4, aka the signature (err, req, res, next).
// // when connect has an error, it will invoke ONLY error-handling
// // middleware.

// // If we were to next() here any remaining non-error-handling
// // middleware would then be executed, or if we next(err) to
// // continue passing the error, only error-handling middleware
// // would remain being executed, however here
// // we simply respond with an error page.

// app.use(function(err, req, res, next){
//   // we may use properties of the error object
//   // here and next(err) appropriately, or if
//   // we possibly recovered from the error, simply next().
//   res.status(err.status || 500);
//   res.render('500', { error: err });
// });

// app.get('/404', function(req, res, next){
//   // trigger a 404 since no other middleware
//   // will match /404 after this one, and we're not
//   // responding here
//   next();
// });

// app.get('/403', function(req, res, next){
//   // trigger a 403 error
//   var err = new Error('not allowed!');
//   err.status = 403;
//   next(err);
// });

// app.get('/500', function(req, res, next){
//   // trigger a generic (500) error
//   next(new Error('keyboard cat!'));
// });


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


/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs')
  , auth = require('./auth/auth').auth
  , routes = require('./routes/routes');

// Define authenticated user

var port;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  //app.use(express.bodyParser());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public'}));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  port = 3000;
});

app.configure('production', function(){
  app.use(express.errorHandler());
  port = 80;
});

// Routes

app.get('/', routes.index);
app.get('/news', routes.news);
app.get('/about', routes.about);
app.get('/contact', routes.contact);
app.get('/photos', routes.photos);
app.get('/links', routes.links);
app.get('/admin', auth, routes.admin);
app.post('/admin/upload/image', auth, routes.upload_image);

app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

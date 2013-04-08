
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/routes')
  , auth = require('./auth/auth').auth
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//app.use(express.favicon());
app.use(express.favicon(__dirname + '/public/favicon.ico', { maxAge: 2592000000 }));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/main', routes.main);
app.get('/news', routes.news);
app.get('/about', routes.about);
app.get('/contact', routes.contact);
app.get('/photos', routes.photos);
app.get('/links', routes.links);
app.get('/backgrounds', routes.backgrounds);
app.get('/admin', auth, routes.admin);
app.post('/admin/upload/image', auth, routes.upload_image);
app.post('/admin/upload/news', auth, routes.upload_news);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

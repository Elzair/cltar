
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Charlotte Animal Rights - Home' })
};

exports.history = function(req, res){
  res.render('history', { title: 'Charlotte Animal Rights - History' })
};

exports.contact = function(req, res){
  res.render('contact', { title: 'Charlotte Animal Rights - Contact' })
};

exports.join = function(req, res){
  res.render('join', { title: 'Charlotte Animal Rights - Get Involved' })
};

exports.photos = function(req, res){
  res.render('photos', { title: 'Charlotte Animal Rights - Photos' })
};

exports.links = function(req, res){
  res.render('links', { title: 'Charlotte Animal Rights - External Links' })
};

exports.admin = function(req, res){
  res.render('admin', { title: 'Charlotte Animal Rights - Administrative' })
};


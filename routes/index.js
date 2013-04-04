var fs = require('fs');
/*
 * GET home page.
 */

exports.index = function(req, res){
  carousel_path = './public/images/carousel/'
  fs.readdir(carousel_path, function(err, images){
    //console.log(images)
    for (i=0; i<images.length; i++)
      // Strip out './public' from path
      images[i] = carousel_path.substring(8) + images[i];
    res.render('index', { title: 'Charlotte Animal Rights - Home', images: images })
  })
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


var fs = require('fs')
  //, formidable = require('formidable')
  ;
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
    res.render('index', { title: 'Charlotte Animal Rights - Home', active: 0, images: images })
  })
};

exports.news = function(req, res){
  res.render('news', { title: 'Charlotte Animal Rights - News', active: 1 })
};

exports.about = function(req, res){
  res.render('about', { title: 'Charlotte Animal Rights - About', active: 2 })
};

exports.contact = function(req, res){
  res.render('contact', { title: 'Charlotte Animal Rights - Contact', active: 3 })
};

exports.photos = function(req, res){
  res.render('photos', { title: 'Charlotte Animal Rights - Photos', active: 4 })
};

exports.links = function(req, res){
  res.render('links', { title: 'Charlotte Animal Rights - External Links', active: 5 })
};

exports.admin = function(req, res){
  res.render('admin', { title: 'Charlotte Animal Rights - Administrative', active: -1, upload: req.query.upload })
};

exports.upload_image = function(req, res){
  console.log(JSON.stringify(req.files))
  if (req.xhr)
    return res.status(200).end()
  else
    return res.redirect('/admin?upload=1')
  
};


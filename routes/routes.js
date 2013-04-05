var fs = require('fs')
  //, formidable = require('formidable')
  ;
/*
 * GET home page.
 */

exports.index = function(req, res){
  carousel_path = './public/images/carousel/';
  fs.readdir(carousel_path, function(err, images){
    for (i=0; i<images.length; i++)
      // Strip out './public' from path
      images[i] = carousel_path.substring(8) + images[i];
    res.render('index', { title: 'Charlotte Animal Rights - Home', active: 0, images: images });
  });
};

exports.about = function(req, res){
  res.render('about', { title: 'Charlotte Animal Rights - About', active: 1 });
};

exports.contact = function(req, res){
  res.render('contact', { title: 'Charlotte Animal Rights - Contact', active: 2 });
};

exports.news = function(req, res){
  res.render('news', { title: 'Charlotte Animal Rights - News', active: 3 });
};

exports.photos = function(req, res){
  res.render('photos', { title: 'Charlotte Animal Rights - Photos', active: 4 });
};

exports.links = function(req, res){
  res.render('links', { title: 'Charlotte Animal Rights - External Links', active: 5 });
};

exports.admin = function(req, res){
  res.render('admin', { title: 'Charlotte Animal Rights - Administrative', active: -1, upload: req.query.upload });
};

exports.upload_image = function(req, res){
  console.log(JSON.stringify(req.files))
  file_path = '';
  if (req.body.selection == 'photo')
    file_path = 'photos';
  else if (req.body.selection == 'carousel')
    file_path = 'carousel';
  else if (req.body.selection == 'background')
    file_path = 'background';
  else
    return res.status(500).end('An Error occurred.');
  // Change image name to UTC timestamp to prevent conflicts.
  file_name = new Date().getTime();
  switch(req.files.image.type)
  {
    case 'image/jpeg':
      file_ext = '.jpg';
      break;
    case 'image/png':
      file_ext = '.png';
      break;
    case 'image/gif':
      file_ext = '.gif';
      break;
    case 'image/tiff':
      file_ext = '.tif';
      break;
    case 'image/bmp':
      file_ext = '.bmp';
      break;
    default:
      return res.status(500).end('Unsupported Image Type!')
  } 
    
  fs.rename(req.files.image.path, './public/images/' + file_path +'/' + file_name + file_ext, function(err){
    if (err) console.log(err);
    if (req.xhr)
      return res.status(200).end()
    else
      return res.redirect('/admin?upload=1')
  });
  
};


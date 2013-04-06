var fs = require('fs')
  , jade = require('jade')
  , partial = require('./helpers/partial_renderer').partial
  , background = require('./helpers/background')
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
    //choose = new chooser();
    background.choose().on('done', function(bg){ 
      options = { title: 'Charlotte Animal Rights - Home', active: 0, images: images, bg: bg };
      if (req.xhr){
        helper = new partial('index', options);
        helper.on('done', function(ret){ res.json(ret); });
      }
      else
        res.render('index', options);
    });
  });
};

exports.about = function(req, res){
  //choose = new chooser();
  background.choose().on('done', function(bg){
    options = { title: 'Charlotte Animal Rights - About', active: 1, bg: bg };
    if (req.xhr){
      helper = new partial('about', options);
      helper.on('done', function(ret){ res.json(ret); });
    }
    else
      res.render('about', options);
  });
};

exports.contact = function(req, res){
  //choose = new chooser();
  background.choose().on('done', function(bg){
    options = { title: 'Charlotte Animal Rights - Contact', active: 2, bg: bg };
    if (req.xhr){
      helper = new partial('contact', options);
      helper.on('done', function(ret){ res.json(ret); });
    }
    else
      res.render('contact', options);
  });
};

exports.news = function(req, res){
  //choose = new chooser();
  background.choose().on('done', function(bg){
    options = { title: 'Charlotte Animal Rights - News', active: 3, bg: bg };
    if (req.xhr){
      helper = new partial('news', options);
      helper.on('done', function(ret){ res.json(ret); });
    }
    else
      res.render('news', options);
  });
};

exports.photos = function(req, res){
  //choose = new chooser();
  background.choose().on('done', function(bg){
    options = { title: 'Charlotte Animal Rights - Photos', active: 4, bg: bg }
    if (req.xhr){
      helper = new partial('photos', options);
      helper.on('done', function(ret){ res.json(ret); });
    }
    else
      res.render('photos', options);
  });
};

exports.links = function(req, res){
  //choose = new chooser();
  background.choose().on('done', function(bg){
    options = { title: 'Charlotte Animal Rights - External Links', active: 5, bg: bg }
    if (req.xhr){
      helper = new partial('links', options);
      helper.on('done', function(ret){ res.json(ret); });
    }
    else
      res.render('links', { title: 'Charlotte Animal Rights - External Links', active: 5, bg: bg });
  });
};

exports.backgrounds = function(req, res){
  background.get_all().on('done', function(bgs){ res.json(bgs); });
};

exports.admin = function(req, res){
  background.choose().on('done', function(bg){
    res.render('admin', { title: 'Charlotte Animal Rights - Administrative', active: -1, upload: req.query.upload, bg: bg });
  });
};

exports.upload_image = function(req, res){
  console.log(JSON.stringify(req.files));
  console.log(JSON.stringify(req.body));
  file_path = '';
  if (req.body.selection == 'photo')
    file_path = 'photos';
  else if (req.body.selection == 'carousel')
    file_path = 'carousel';
  else if (req.body.selection == 'background')
    file_path = 'background';
  else
    return res.send(500, 'An Error occurred.');
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
      return res.send(500, 'Unsupported Image Type!')
  } 
    
  fs.rename(req.files.image.path, './public/images/' + file_path +'/' + file_name + file_ext, function(err){
    if (err){ console.log('Error: '+err); res.send(500, 'Upload Unsuccessful') };
    if (req.xhr)
      return res.send(200, 'Upload Successful');
    else
      return res.redirect('/admin?upload=1')
  });
};


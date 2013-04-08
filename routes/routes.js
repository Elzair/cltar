var fs = require('fs')
  , jade = require('jade')
  , dateformat = require('dateformatter').format
  , path = require('path')
  , renderer = require('./helpers/renderer')
  , getter = require('./helpers/getter')
  ;
/*
 * GET home page.
 */

exports.home = function(req, res){
  carousel_path = path.join('images','carousel');
  getter.get_all(carousel_path)
  .on('done', function(data){
    images = JSON.parse(data);
    getter.choose_bg().on('done', function(bg){ 
      options = { title: 'Charlotte Animal Rights - Home', 
        active: 0, images: images, bg: bg };
      if (req.xhr)
        renderer.render_partial('home', options)
        .on('done', function(ret) { res.json(ret); });
      else
        res.render('home', options);
    });
  })
  .on('error', function(err){
    res.send(500, 'Error');
  });
};

exports.about = function(req, res){
  getter.choose_bg().on('done', function(bg){
    options = { title: 'Charlotte Animal Rights - About', 
      active: 1, bg: bg };
    if (req.xhr)
      renderer.render_partial('about', options)
      .on('done', function(ret) { res.json(ret); });
    else
      res.render('about', options);
  });
};

exports.contact = function(req, res){
  getter.choose_bg().on('done', function(bg){
    options = { title: 'Charlotte Animal Rights - Contact', 
      active: 2, bg: bg };
    if (req.xhr)
      renderer.render_partial('contact', options)
      .on('done', function(ret) { res.json(ret); });
    else
      res.render('contact', options);
  });
};

exports.news = function(req, res){
  getter.choose_bg().on('done', function(bg){
    news_path  = 'news';
    getter.get_all(news_path, { full_path: true })
    .on('done', function(data){
      // Get contents of all files
      urls = JSON.parse(data);
      news = {};
      for (i=0; i<urls.length; i++){console.log(urls[i]);
        news[i] = fs.readFileSync(urls[i], 'utf8');}
      options = { title: 'Charlotte Animal Rights - News', 
        active: 3, bg: bg, news: news };
      if (req.xhr)
        renderer.render_partial('news', options)
        .on('done', function(ret) { res.json(ret); });
      else
        res.render('news', options);
    });
  });
};

exports.photos = function(req, res){
  getter.choose_bg().on('done', function(bg){
    photo_path = path.join('images', 'photos');
    getter.get_all(photo_path)
    .on('done', function(data){
      photos = JSON.parse(data);
      options = { title: 'Charlotte Animal Rights - Photos', 
        active: 4, bg: bg, photos: photos };
      if (req.xhr)
        renderer.render_partial('photos', options)
        .on('done', function(ret) { res.json(ret); });
      else
        res.render('photos', options);
    });
  });
};

exports.links = function(req, res){
  getter.choose_bg().on('done', function(bg){
    options = { title: 'Charlotte Animal Rights - External Links', 
      active: 5, bg: bg };
    if (req.xhr)
      renderer.render_partial('links', options)
      .on('done', function(ret) { res.json(ret); });
    else
      res.render('links', options);
  });
};

exports.backgrounds = function(req, res){
  getter.get_all('images/background').on('done', function(bgs){ res.json(bgs); });
};

exports.admin = function(req, res){
  now = dateformat('Y-m-d', new Date().getTime());
  getter.choose_bg().on('done', function(bg){
    options = { title: 'Charlotte Animal Rights - Administrative', 
      active: -1, upload: req.query.upload, bg: bg, now: now };
    res.render('admin', options);
  });
};

exports.upload_image = function(req, res){
  dir = '';
  if (req.body.selection === 'photo')
    dir = 'photos';
  else if (req.body.selection === 'carousel')
    dir = 'carousel';
  else if (req.body.selection === 'background')
    dir = 'background';
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
      return res.send(500, 'Unsupported Image Type!');
  } 
  file_path = path.join(path.dirname(), 'public', 'images', 
    dir, file_name+file_ext);

  fs.rename(req.files.image.path, file_path, function(err){
    if (err){ 
      res.send(500, 'Upload Unsuccessful'); 
    }
    if (req.xhr)
      res.send(200, 'Upload Successful');
    else
      res.redirect('/admin?upload=1');
  });
};

exports.upload_news = function(req, res){
  if ((req.body.news === '') || isNaN(Date.parse(req.body.date))){
    res.send(500, 'Invalid Parameters!');
    return;
  }
  // Render markdown as HTML
  renderer.render_markdown(req.body.news)
  .on('done', function(html){ 
    // Change file name to UTC timestamp to prevent conflicts.
    file_name = new Date().getTime() + '.news';
    file_path = path.join(path.dirname, 'public', 'news', file_name);
    fs.writeFile(file_path, html, function(err){
      if (err){
        res.send(500, 'Error!');
        return;
      }
      if (req.xhr)
        res.send(200, 'Upload Successful');
      else
        res.redirect('/admin?upload=2');
    });
  })
  .on('error', function(err){
    res.send(500, 'Could not parse file!');
    return;
  });
};


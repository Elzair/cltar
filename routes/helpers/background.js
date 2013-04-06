var fs = require('fs')
  , path = require('path')
  , events = require('events')
  , util = require('util')
  ;

// This function returns the relative URL of a
// randomly chosen file in /public/images/backgrounds.
function random_chooser(){
  events.EventEmitter.call(this);
  var self = this;
  background_path = './public/images/background/';
  fs.readdir(background_path, function(err, images){
    // Get random background image
    i = Math.floor(Math.random()*images.length);
    // Strip './public' from paths
    images[i] = background_path.substring(8) + images[i];
    self.emit('done', images[i]);
  });
}

// This function retrieves all the files in a given
// subdirectory of public.
function getter(p){
  events.EventEmitter.call(this);
  var self = this;
  //background_path = './public/images/background/';
  pp = path.join(__dirname, 'public');
  ppp = path.join(pp, p);
  fs.readdir(ppp, function(err, files){
    console.log(ppp);
    // Strip './public' from paths
    for (i=0; i<files.length; i++)
     files[i] = path.join(p, files[i]);
    out = JSON.stringify(files);
    self.emit('done', out);
  });
}

// All helper objects should inherit from EventEmitter.
util.inherits(random_chooser, events.EventEmitter);
util.inherits(getter, events.EventEmitter);

// Exports
//
exports.choose = function(){
  return new random_chooser();
};

exports.get_all = function(p) {
  return new getter(p);
};

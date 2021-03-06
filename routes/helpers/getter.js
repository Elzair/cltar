var fs = require('fs')
  , path = require('path')
  , events = require('events')
  , util = require('util')
  ;

// This function returns the relative URL of a
// randomly chosen file in /public/images/backgrounds.
function bg_chooser(){
  events.EventEmitter.call(this);
  var self = this;
  background_path = './public/images/background/';
  fs.readdir(background_path, function(err, images){
    if (err){
      self.emit('error', err);
      return;
    }
    // Get random background image
    i = Math.floor(Math.random()*images.length);
    // Strip './public' from paths
    images[i] = background_path.substring(8) + images[i];
    self.emit('done', images[i]);
  });
}

// This function retrieves all the files in a given
// subdirectory of public and returns them in JSON format.
function get_files(p, options){
  options.full_path = options.full_path || false;
  pp = path.join(path.dirname(), 'public', p);
  ppp = options.full_path ? pp : p;
  events.EventEmitter.call(this);
  var self = this;
  fs.exists(pp, function(exists){
    if (exists){
      fs.readdir(pp, function(err, files){
        if (err){
          self.emit('error', err);
          return;
        }
        for (i=0; i<files.length; i++){
          files[i] = path.join(ppp, files[i]);
        }
        out = JSON.stringify(files);
        self.emit('done', out);
      });
    }
    else {
      self.emit('error', 'Directory does not exist!');
      return;
    }
  });
}

// All helper objects should inherit from EventEmitter.
util.inherits(bg_chooser, events.EventEmitter);
util.inherits(get_files, events.EventEmitter);

// Exports
//
exports.choose_bg = function(){
  return new bg_chooser();
};

exports.get_all = function(p, options) {
  options = options || {full_path: false};
  return new get_files(p, options);
};

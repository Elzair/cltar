var fs = require('fs')
  , events = require('events')
  , util = require('util')
  ;

function my_chooser(){
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
};

function getter(path){
  events.EventEmitter.call(this);
  var self = this;
  background_path = './public/images/background/';
  fs.readdir(background_path, function(err, images){
    console.log(background_path);
    // Strip './public' from paths
    for (i=0; i<images.length; i++)
     images[i] = background_path.substring(8) + images[i];
    bgs = JSON.stringify(images);
    self.emit('done', bgs);
  });
};

// Both objects should inherit from EventEmitter.
util.inherits(my_chooser, events.EventEmitter);
util.inherits(getter, events.EventEmitter);

// Exports
//
exports.choose = function(){
  return new my_chooser();
};

exports.get_all = function() {
  return new getter();
};

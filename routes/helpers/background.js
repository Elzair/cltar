var fs = require('fs')
  , events = require('events')
  , util = require('util')
  ;

var my_chooser = function(){
  events.EventEmitter.call(this);
  var self = this;
  background_path = './public/images/background/';
  fs.readdir(background_path, function(err, images){
    // Get random background image
    i = Math.floor(Math.random()*images.length);
    images[i] = background_path.substring(8) + images[i];
    self.emit('done', images[i]);
  });
};

util.inherits(my_chooser, events.EventEmitter);

exports.chooser = my_chooser;

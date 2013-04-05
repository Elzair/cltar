var fs = require('fs')
  , jade = require('jade')
  , events = require('events')
  , util = require('util')
  ;

var partial_renderer = function(template, options){
  events.EventEmitter.call(this);
  var self = this;
  fs.readFile('./views/' + template + '.jade', 'utf8', function(err, data){
    // Stripping the first line make Jade render only the template not the layout.
    input = data.replace('extends layout\n','');
    rendered = jade.compile(input, {filename: './views/'+template})(options);
    ret = JSON.stringify({'view': template, 'src': rendered});
    self.emit('done', ret);
  });
};
util.inherits(partial_renderer, events.EventEmitter);

exports.partial = partial_renderer;

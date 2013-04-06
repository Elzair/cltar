var fs = require('fs')
  , path = require('path')
  , jade = require('jade')
  , events = require('events')
  , util = require('util')
  ;

// This function renders only the Jade template passed to it
// without any layout.
var partial_renderer = function(template, options, layout){
  layout = layout || 'layout'; // name of layout to strip
  events.EventEmitter.call(this);
  var self = this;
  view_path = path.join(path.dirname(), 'views', template + '.jade');
  file_name = path.join('views', template);
  fs.readFile(view_path, 'utf8', function(err, data){
    if (err){
      self.emit('error', err);
      return;
    }
    // Stripping the first line make Jade render only the template not the layout.
    input = data.replace('extends '+layout+'\n','');
    rendered = jade.compile(input, {filename: file_name})(options);
    ret = JSON.stringify({'view': template, 'src': rendered});
    self.emit('done', ret);
  });
};

util.inherits(partial_renderer, events.EventEmitter);

exports.render_partial = function(template, options, layout){
  return new partial_renderer(template, options, layout);
};

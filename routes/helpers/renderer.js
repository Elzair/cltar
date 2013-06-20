var fs = require('fs')
  , path = require('path')
  , jade = require('jade')
  , events = require('events')
  , util = require('util')
  , markx = require('markx')
  ;

// This function renders only the Jade template passed to it
// without any layout.
function partial_renderer(template, options, layout){
  options.partial = true;
  events.EventEmitter.call(this);
  var self = this;
  view_path = path.join(path.dirname(), 'views', template + '.jade');
  file_name = path.join('views', template);
  fs.readFile(view_path, 'utf8', function(err, data){
    if (err){
      self.emit('error', err);
      return;
    }
    input = data;
    // Compile the single template file.
    rendered = jade.compile(input, {filename: file_name})(options);
    ret = JSON.stringify({'view': template, 'src': rendered});
    self.emit('done', ret);
  });
}

// This function renders a markdown file and returns the HTML result.
function markdown_renderer(input){
  events.EventEmitter.call(this);
  var self = this;
  markx({
    input: input,
    template: '',
    highlight: false,
    data: {}
  }, function(err, html){
    if (err){
      self.emit('error', err);
      return;
    }
    self.emit('done', html);
  });
}

// Both funcitons inherit from event.EventEmitter.
util.inherits(partial_renderer, events.EventEmitter);
util.inherits(markdown_renderer, events.EventEmitter);

// Expose functions to the world
exports.render_partial = function(template, options, layout){
  return new partial_renderer(template, options, layout);
};

exports.render_markdown = function(input){
  return new markdown_renderer(input);
};

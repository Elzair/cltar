$(document).ready(function() {
  $('.carousel-image').addClass(this.width/this.height>1 ? 'wide' : 'tall');
  $('.carousel').carousel({interval: 5000});
});

$(document).ready(function() {
  $('.submit').hide();
  $('.upload, .image, .file').change(function(){
    $('form.upload.image').submit();
  });
});

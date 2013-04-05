$(document).ready(function() {
  $('.submit').hide();
  $('input.file').change(function(){
    $('form.upload.image').submit();
  });
});

$(document).ready(function(){
  $('.hideme').toggle();
  $('input.file').change(function(){
    $('p.text').addClass('hidden').removeClass('error');
    $('form.upload.image').submit();
  });
  $('form.upload.image').submit(function(){
    $(this).ajaxSubmit({
      error: function(xhr){
        $('p.text').removeClass('hidden').addClass('error').text('Error uploading image!');
      },
      success: function(res){
        $('p.text').removeClass('hidden').text('Image successfully uploaded!');
      }
    });
  });
});

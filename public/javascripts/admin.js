$(document).ready(function(){
  $('.hideme').hide(); // Hide Non-Ajax Icons
  $('p.upload.image').removeClass('hidden').hide();
  // Event fires when user selects file
  $('input.file').change(function(){
    $('p.upload.image').removeClass('error').hide();
    $('.modal').modal({ keyboard: false });
  });
  // Event fires when user clicks OK in modal window
  $('a.modal-upload').click(function(e){
    e.preventDefault();
    $('input.upload.image.caption').val($('input.modal-upload.image.caption').val());
    $('.modal').modal('hide');
    $('form.upload.image').submit();
  });
  // Submit form via AJAX using jquery.form plugin
  $('form.upload.image').submit(function(e){
    e.preventDefault();
    $(this).ajaxSubmit({
      error: function(xhr){
        $('p.upload.image').addClass('error').text('Error uploading image!').show();
      },
      success: function(res){
        $('p.upload.image').text('Image successfully uploaded!').show();
      }
    });
  });
});

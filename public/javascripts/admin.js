$(document).ready(function(){
  $('.hideme').hide(); // Hide Non-Ajax Icons
  $('p.upload').removeClass('hidden').hide();

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

  // Open DatePicker when user clicks on calendar.
  $('.date-click').click(function(e){
    $('.datepicker').datepicker('show');
  });
  
  // Close DatePicker when user selects date.
  $('.datepicker').on('changeDate', function(ev){
    $(this).datepicker('hide');
  });

  // Submit other form via AJAX using jquery.form plugin 
  $('input.upload.news').click(function(e){
    e.preventDefault();
    $('p.upload.news').removeClass('error').hide();
    // Validate input forms.
    if ($('textarea.upload.news').val() === ''){
      $('p.upload.news').addClass('error').text('You need to write something!').show();
      return false;
    }
    //if (isNan(Date.parse($('input.span2.datestore').val()))){
    //  $('p.upload.news').addClass('error').text('Invalid Date!').show();
    //  return false;
    //}
    $('form.upload.news').ajaxSubmit({
      error: function(xhr){
        $('p.upload.news').addClass('error').text('Error uploading post!' + JSON.stringify(xhr)).show();
      },
      success: function(res){
        $('p.upload.news').text('Post successfully uploaded!').show();
        $('textarea.upload.news').val(''); // Blank input post on upload
      }
    });
  });
});

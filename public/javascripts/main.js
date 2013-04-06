$(document).ready(function(){
  var backgrounds = [];
  $.ajax({
    url: '/backgrounds',
    dataType: 'json',
    success: function(data){
      backgrounds = JSON.parse(data);
    }
  });
  // Load pages via AJAX.
  $('a').not('external').on('click', function(e){
    short_url = $(this).attr('href'); // This matches the URL with a menu item.
    url = this.href;

    // Make AJAX request to get page content.
    $.ajax({
      url: url, 
      dataType: 'json',
      success: function(data){
        // Hide old page
        $('div.content').hide();

        // Choose random background image
        i = Math.floor(Math.random()*backgrounds.length)
        $('img.bg-image').attr('src', backgrounds[i]);

        // Create new div for the new page.
        $('.page-content').append(JSON.parse(data)['src']);

        // Update the browser's URL
        history.pushState({url: url}, '', url);
        
        // Highlight the correct menubar item.
        $('li.nav-item').each(function(aindex){
          $(this).removeClass('active');
          $(this).children().each(function(bindex){
            if ($(this).attr('href') == short_url)
              $(this).parent().addClass('active');
          });
        });
      },
    });
    // Prevent browser from following the clicked link.
    e.preventDefault();
  });
});

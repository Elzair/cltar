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
    // This prevents the system from retrieving dud links.
    if ($(this).attr('href') === '#')
      return;
    
    // Get short and long forms of the requested URL.
    short_url = $(this).attr('href'); // This matches the URL with a menu item.
    url = this.href;

    // Highlight the correct menubar item.
    $('li.nav-item').each(function(aindex){
      $(this).removeClass('active');
      $(this).children().each(function(bindex){
        if ($(this).attr('href') === short_url){
          $(this).parent().addClass('active');
        }
      });
    });

    // Hide current page
    $('div.content.current').removeClass('current').hide();
        
    // To recycle our garbage, only load a new page if a current copy
    // is not already in the DOM
    div_class = short_url.replace('/','');
    if ($('div.content.'+div_class).length !== 0){
      $('div.content.'+div_class).addClass('current').show();
      history.pushState({url: url, div_class: div_class}, '', url);
      e.preventDefault();
      return;
    }

    // Make AJAX request to get new page content.
    $.ajax({
      url: url, 
      dataType: 'json',
      success: function(data){

        // Choose random background image
        i = Math.floor(Math.random()*backgrounds.length);
        $('img.bg-image').attr('src', backgrounds[i]);

        // Create new div for the new page.
        $('.page-content').append(JSON.parse(data)['src']);

        // Update the browser's URL
        div_class = JSON.parse(data)['view']; // server returns view name
        history.pushState({url: url, div_class: div_class}, '', url); 
        
      },
      error: function(err){
        console.log(JSON.stringify(err));
        $('li.nav-item').removeClass('active');
        $('div.content.page-error').show();
      }
    });
    // Prevent browser from following the clicked link.
    e.preventDefault();
  });
  window.addEventListener('popstate', function(ev){
    // ev.state is null when the user loads the page for the first time.
    // This snippet pushes the first page onto the history stack.
    if (ev.state === null){
      url = document.URL; // Get URL of first page
      classes = $('div.content.current').attr('class').split(' ');
      div_class = '';
      for (i=0; i<classes.length; i++){
        if ((classes[i] !== 'content') && (classes[i] !== 'current')){
          div_class = classes[i];
          console.log(div_class);
        }
      }
      history.pushState({url: url, div_class: div_class}, '', url);
    }
    // Otherwise, show the div corresponding to the previous or next page     
    // when the user presses the back or forward buttons in their browser.
    else{
      // Show correct content div.
      $('div.content.current').removeClass('current').hide();
      $('div.content.'+ev.state.div_class).addClass('current').show();
      // Highlight correct menu item.
      $('li.nav-item.active').removeClass('active');
      $('li.nav-item'+ev.state.div_class).addClass('active');
    }
  });
});


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

        // Hide current page
        $('div.content.current').removeClass('current').hide();

        // Choose random background image
        i = Math.floor(Math.random()*backgrounds.length);
        $('img.bg-image').attr('src', backgrounds[i]);

        // Create new div for the new page.
        $('.page-content').append(JSON.parse(data)['src']);

        // Update the browser's URL
        //console.log(JSON.stringify({url:url,div_class:div_class}));
        //history.pushState({url: url, div_class: div_class}, '', url);
        // Get list of classes of current page
        //classes = $('div.content.current').attr('class').split(' ');
        //div_class = '';
        //for (i=0; i<classes.length; i++){
        //  if ((classes[i] !== 'content') && (classes[i] !== 'current')){
        //    div_class = classes[i];
        //    console.log(div_class);
        //  }
        //}
        div_class = JSON.parse(data)['view'];
        history.pushState({url: url, div_class: div_class}, '', url); 
        
        // Highlight the correct menubar item.
        $('li.nav-item').each(function(aindex){
          $(this).removeClass('active');
          $(this).children().each(function(bindex){
            if ($(this).attr('href') === short_url){
              $(this).parent().addClass('active');
            }
          });
        });
      },
    });
    // Prevent browser from following the clicked link.
    e.preventDefault();
  });
  window.addEventListener('popstate', function(ev){
    url = document.URL;
    console.log('EV State: '+JSON.stringify(ev.state));
    if (ev.state === null){
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
    else{
      $('div.content.current').removeClass('current').hide();
      $('div.content.'+ev.state.div_class).addClass('current').show();
      $('li.nav-item.active').removeClass('active');
      $('li.nav-item'+ev.state.div_class).addClass('active');
    }
  });
});


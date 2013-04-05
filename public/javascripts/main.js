$(document).ready(function(){
  $('a').not('external').on('click', function(e){
    console.log(this);
    //alert('Goodbye!');
    short_url = $(this).attr('href');
    url = this.href;
    $.ajax({
      url: url, 
      dataType: 'json',
      success: function(data){
        $('div.content').hide();
        $('.page-content').append(JSON.parse(data)['src']);
        //alert(JSON.parse(data)['src']);
        history.pushState({url: url}, '', url);
        $('li.nav-item').each(function(aindex){
          $(this).removeClass('active');
          $(this).children().each(function(bindex){
            //console.log($(this).attr('href'));
            if ($(this).attr('href') == short_url)
              $(this).parent().addClass('active');
          });
          //console.log(isactive);
          /*if (isactive == 'active'){
            $(this).addClass('active');
            return;
          }*/
        });
      },
    });
    e.preventDefault();
  });
});

var i=0, facts = {};
function nextFact() {
  //$('.fact-link').attr('href', facts[i].guid);
  $('.fact-holder').html(facts[i].content);
  i = (i+1) % facts.length;
}
$(document).ready(function() {
  var params = {
    action: 'ffm_update',
    ffm_aspects: 'facts',
    ffm_location: 'US'
  };
  $.ajax({
    url: 'http://www.factoryfarmmap.org/wp-admin/admin-ajax.php',
    data: params,
    dataType: 'jsonp',
    success: function(data) {
      console.log(data);
      facts = data.facts;
      nextFact();
      window.setInterval(nextFact, 10000);
    }, 
  });
});


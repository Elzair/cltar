var persecond = 8;
var numbers = [ 57468865000, 2931384000, 1382584355, 1144477000,
656821000, 649214000, 497394194, 455364788, 310739476, 69800000,
55604000, 33289675, 4500705, 2461800, 1688623, 595000, 542600];
var counts = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
var rate = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
function incrementcounter()
{
  var num;
  var str;
  var th;
  for (var i = 0; i < numbers.length; ++i) {
    //console.log(i);
    counts[i] += rate[i];
    str = "";
    num = Math.round(counts[i]);
    while (num > 1000) {
      th = num % 1000;
        if (th < 10)
          th = "00" + th;
        else if (th < 100)
          th = "0" + th;
        str = "," + th + str;
        num = Math.floor(num / 1000);
    }
    str = num + str;
    document.getElementById("count" + i).innerHTML = str;
  }
}
var intervalid = 0;
function initcounter()
{
  var disp;
  for (var i = 0; i < numbers.length; ++i) {
    if (numbers[i] == 0) {
      disp = "none";
    } else {
      disp = "block";
    }
    document.getElementById("counter" + i).style.display = disp;
    rate[i] = numbers[i] / 365 / 24 / 60 / 60 / persecond;
    counts[i] = 0;
  }
  if (intervalid != 0)
    clearInterval(intervalid);
  intervalid = setInterval("incrementcounter()", 1000 / persecond);
}
initcounter();

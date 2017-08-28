$(function(){
  var days = "Days",
     hours = "Hours",
   minutes = "Minutes",
   seconds = "Seconds",
   loading = true,
   dividers = ['days,','hours,','minutes,','seconds until...'];


  var concert = new Date('September 18, 2017 18:00:00');
  var ticketsOnSale = new Date('August 28, 2017 00:00:00');

  function pad(n) {
  	return (parseInt(n) < 10 ? '0' : '') + n;
  }

  function setText(innertext) {
    $('#countdown').text(innertext);
    // console.log(innertext);
    $(document).trigger('clearLoadingScreen');
  }

  function clearLoadingScreen(){
    if (loading) {
      loading = false;
      $('.loader').fadeOut("slow");
      $(document).off('clearLoadingScreen');
    }
  }

  $(document).on('clearLoadingScreen',clearLoadingScreen);

  function tickDown(now) {
    var target_date = new Date(concert).getTime();
    var current_date = new Date(now).getTime();

    var diff = (target_date - current_date) / 1000;
    var dys = Math.ceil(diff/86400);

    diff = diff % 86400;
    var hrs = Math.ceil(diff/3600);

    diff = diff % 3600;

    var mins = Math.ceil(diff/60);
    var secs = 60 - new Date(now).getSeconds();
    secs = secs == 60 ? '00' : pad(secs);

    var newCount = [pad(dys), dividers[0], pad(hrs), dividers[1], pad(mins), dividers[2], secs, dividers[3]].join(' ');

    setText(newCount);
  }

  var countdown;

  window.onload = function(){
    tickDown(Date.now());

    countdown = setInterval(function(){
      tickDown(Date.now());
    }, 1000);

    if (Date.now() < ticketsOnSale) {
      $("#brown-paper-bag").addClass('disabled').attr('href','').text("Buy Tickets 08/28/17");
      $(".cart .col-xs-6").removeClass('col-xs-6').addClass('col-xs-5');
      $(".cart .col-xs-3").last().removeClass('col-xs-3').addClass('col-xs-4');
    } else {
      $("#brown-paper-bag").text("Buy Tickets");
    }

    var detectMobile;
    if (detectMobile) {
      // add mobile css
    }
  };
});
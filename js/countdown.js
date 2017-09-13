$(function(){
  var countdown;
  var days = "Days";
  var hours = "Hours";
  var minutes = "Minutes";
  var seconds = "Seconds";
  var loading = true;
  var dividers = ['days,','hours,','minutes,','seconds until...'];
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

  function setCustomDonateLink(donateId=false) {
    var newHref, modalText;
    var baseHref = "https://redeemer.tpsdb.com/OnlineReg/2926?GoerID=";

    if (donateId || window.location.search.indexOf('donateId=') > -1) {
      donateId = donateId || window.location.search.split('donateId=')[1].toLowerCase();
    }

    switch (donateId) {
      case 'tiffany':
        newHref = baseHref + '78859'
        modalText = 'You are donating in support of Tiffany Hyun'
        break;
      case 'michelle':
        newHref = baseHref + '26329'
        modalText = 'You are donating in support of Michelle Jennings'
        break;
      case 'rachel':
        newHref = baseHref + '78560'
        modalText = 'You are donating in support of Rachel Zevita'
        break;
      default:
        newHref = baseHref + '0'
        $('#back').hide();
        $(document).on('click', '.performers li', delegateCustomClicks);
    }

    if (donateId.length > 0) {
      var capitalized = donateId.charAt(0).toUpperCase() + donateId.slice(1);
      $('#back').show();
      $('#selected-performer').text(capitalized);
      $('.disclaimer .performer-name').text(capitalized);
      $('.donate-selection').hide();
    }

    $('#donate-modal').attr('href', newHref)
  }

  function delegateCustomClicks(e){
    var donateId = $(e.target).data('performer');
    setCustomDonateLink(donateId);
  }

  window.onload = function(){
    $(document).on('click', '#back', function(e){
      $('#selected-performer').text('Team');
      $('.disclaimer .performer-name').text('a teammate');
      $('.donate-selection').show();
      setCustomDonateLink(false);
    });

    $(document).on('click', 'a.donate-cast', delegateCustomClicks);

    setCustomDonateLink();
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
  };
});

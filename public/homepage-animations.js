

$(function() {

    setTimeout(function() {
      $('.fly-in-text').removeClass('hidden');
    }, 5000);

    setTimeout(function() {
      $('.kapow').addClass('old-batman-effects-hide');
      $('.crash').addClass('old-batman-effects-hide');
      $('.bloop').addClass('old-batman-effects-hide');
      $('.vronk').addClass('old-batman-effects-hide');
    }, 3000);

    setTimeout(function() {
      $('.click-to-fight').removeClass('hidden-image');
      $('.click-to-fight').addClass('animated zoomIn');
    }, 15000);



})();

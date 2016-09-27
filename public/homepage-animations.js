

$(function() {

    setTimeout(function() {
      $('.fly-in-text').removeClass('hidden');
    }, 5000);

    setTimeout(function() {
      $('.kapow').addClass('old-batman-effects-hide');
    }, 3000);

    setTimeout(function() {
      $('.crash').addClass('old-batman-effects-hide');
    }, 3000);

    setTimeout(function() {
      $('.bloop').addClass('old-batman-effects-hide');
    }, 3000);

    setTimeout(function() {
      $('.vronk').addClass('old-batman-effects-hide');
    }, 3000);

    setTimeout(function() {
      $('.click-to-fight').removeClass('hidden-image');
      $('.click-to-fight').addClass('animated zoomIn');
    }, 15000);

    var $signInButton = $('#google-signin');
    var $signOutButton = $('.google-signout');

    $signInButton.click(hideSignInButton);
    function hideSignInButton() {
      $signInButton.addClass('hide-button');
      $signOutButton.removeClass('hide-button');
    }

    $signOutButton.click(hideSignOutButton);
    function hideSignOutButton() {
      $signInButton.removeClass('hide-button');
      $signOutButton.addClass('hide-button');
      window.location.reload();

    }

})();

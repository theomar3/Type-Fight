var $googlePic = $('#google-pic');
var googleImage;

function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  var googleID = profile.getId();
  googleImage = profile.getImageUrl();
  console.log("ID Token: " + id_token);
  localStorage.setItem('googleID', googleID);

};

$googlePic.attr('src', googleImage).load(function() {
  this.width;
});

// var $templateHtml = $('#google-pic-template').html();
// var htmlFactory = _.template($templateHtml);
// var $googlePic = $('#google-pic');
//
// var html = htmlFactory(
//   {
//     google-image: googlePic
//   }
// )
// $googlePic.append(html);


function getUserId() {
  var userGoogleID = localStorage.getItem('googleID');

  if (userGoogleID) {
    console.log('google id', userGoogleID);
    return userGoogleID;
  }
  else {
    var id = localStorage.getItem('randomId');
    return id;
  }
}

module.exports = getUserId;

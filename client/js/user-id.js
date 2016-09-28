function getUserId() {
  var userGoogleID = localStorage.getItem('googleID');

  if (userGoogleID) {
    console.log('google id', userGoogleID);
    return userGoogleID;
  }
  else {

  }
}

module.exports = getUserId;

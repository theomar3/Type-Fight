var $justPlayButton = $('#just-play');
$justPlayButton.on('click', getUserId);

function getUserId() {

  var id = localStorage.getItem('randomId');
  if (id) {
    console.log(' id', id);
  }
  else {
    var randomId = Math.ceil(Math.random() * 1000000000);
    localStorage.setItem('randomId', randomId);
    id = randomId;
  }
  window.location = "react.html";
  return id;
}

var $playTypeFight = $('.fly-in-text');
$playTypeFight.on('click', getUserId);

var $play = $('#play');
$play.on('click', getUserId);

function getUserId() {

  var id = localStorage.getItem('randomId');
  if (id) {
    console.log(' id', id);
  }
  else {
    var randomId = Math.ceil(Math.random() * 1000000000);
    localStorage.setItem('randomId', randomId);
    id = randomId;
    console.log('random id', id);
  }
  window.location = "react.html";
  return id;
}

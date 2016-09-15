

var audioFiles = {
  play: function() {
    var victory = document.getElementById('./music/victory.mp3');
    victory.play();
  }

  hurtSound: function() {
    var hurtSound = document.getElementById('....');
    hurtSound.play();
  }


}

in store
audioFiles.hurtSound();


module.exports = audioFiles;

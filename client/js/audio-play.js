var warning;
var danger;
var audioPlay = {
  playForwardSlash: function() {
    var forwardSlash = document.getElementById('forwardSlash');
    forwardSlash.play();
  },

  playWarning : function() {
    warning = document.getElementById('warning');
    warning.play();

  },

  playDanger : function() {
    danger = document.getElementById('danger');
    danger.play();

  },

  pauseWarning : function() {
    warning = document.getElementById('warning');
    warning.pause();

  },

  pauseDanger : function() {
    danger = document.getElementById('danger');
    danger.pause();

  },





}



// in store
// audioPlay.hurtSound();


module.exports = audioPlay;

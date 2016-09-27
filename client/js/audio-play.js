var warning;
var danger;
var audioPlay = {
  forwardSlash: function() {
    var forwardSlash = document.getElementById('forwardSlash');
    forwardSlash.play();
  },

  chargingSlash: function() {
    var chargingSlash = document.getElementById('chargingSlash');
    chargingSlash.play();
  },
  
  upwardSlash: function() {
    var upwardSlash = document.getElementById('upwardSlash');
    upwardSlash.play();
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

  webBall : function() {
    var webBall = document.getElementById('webBall');
    webBall.play();
  },

  webSwing : function() {
    var webSwing = document.getElementById('webSwing');
    webSwing.play();
  },

  spiderSting : function() {
    var spiderSting = document.getElementById('spiderSting');
    spiderSting.play();
  },

  playerHit : function() {
    var playerHit = document.getElementById('playerHit');
    playerHit.play();
  },

  victory : function() {
    var victory = document.getElementById('victory');
    victory.play();
  },

  cpuHit : function() {
    var cpuHit = document.getElementById('cpuHit');
    cpuHit.play();
  },

  wrongInput: function() {
    var wrongInput = document.getElementById('wrongInput');
    wrongInput.play();
  }

}



module.exports = audioPlay;

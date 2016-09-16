var $ = require('jquery');


var intervalId;
var battleTheme;
var danger;
var warning;



var cpuAttacks = [
  'Web Ball!',
  'Web Swing!',
  'Spider Sting!',
];





function randomIndexing(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function randomString(length, chars) {
    var string = '';
    if (chars.indexOf('a') > -1) string += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) string += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) string += '0123456789';
    if (chars.indexOf('!') > -1) string += '!@#$%&()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += string[Math.round(Math.random() * (string.length - 1))];
    return result;
}


var state = {
  data: [],
  text: 'Click to begin',
  cpuAttack: '',
  playerAttack: '',
  playerHP: 30,
  playerStatus: 'healthyHP',
  cpuHP: 20,
  cpuStatus: 'healthyHP',
  healString: '',
  cpuTaunt: '',
  playerSprite: './images/kenshin-start.gif',
  cpuSprite: './images/spidey-start.gif',

}

var store = {
  listeners : [],
  actions: {}
}

store.addListener = function(listener) {
  store.listeners.push(listener);
}

store.copyState = function() {
  return {
    data : state.data,
    text : state.text,
    cpuAttack: state.cpuAttack,
    playerAttack: state.playerAttack,
    playerHP: state.playerHP,
    playerStatus: state.playerStatus,
    cpuHP: state.cpuHP,
    cpuStatus: state.cpuStatus,
    healString: state.healString,
    cpuTaunt: state.cpuTaunt,
    playerSprite: state.playerSprite,
    cpuSprite: state.cpuSprite,
  }
}

function changed() {
  var copiedState = store.copyState();
  store.listeners.forEach(function(listener){
    listener(copiedState);
  })
}



//actions

function gameState() {
  warning = document.getElementById('warning');
  danger = document.getElementById('danger');

  if(state.playerHP < 8) {
    state.text = 'Warning!';
    state.playerStatus = 'warningHP';
    state.playerSprite = './images/kenshin-warning.gif';
    warning.play();
  }
  if(state.playerHP < 5) {
    state.text = 'Danger!';
    state.playerStatus = 'dangerHP';
    state.playerSprite = './images/kenshin-danger.gif';
    danger.play();
  }

  if(state.playerHP <= 0) {
    state.playerHP = 0;
  }


  if(state.cpuHP < 8) {
    state.cpuStatus = 'warningHP';
    state.cpuSprite = './images/spidey-warning.gif';
  }

  if(state.cpuHP < 5) {
    state.cpuStatus = 'dangerHP';
    state.cpuSprite = './images/spidey-danger.gif';
  }

  if(state.cpuHP <= 0) {
    state.cpuHP = 0;
  }

  if(state.playerHP < 1) {
    endFight();
  }

  if(state.cpuHP < 1) {
    endFight();
  }

  changed();
}

function intervalRounds() {
  var webBall = document.getElementById('webBall');
  var webSwing = document.getElementById('webSwing');
  var spiderSting = document.getElementById('spiderSting');


  state.cpuAttack = randomIndexing(cpuAttacks);
  if(state.cpuAttack === 'Web Ball!') {
    state.cpuSprite = './images/spidey-web-ball.gif';
    webBall.play();
  }
  else if(state.cpuAttack === 'Web Swing!') {
    state.cpuSprite = './images/spidey-kick.gif';
    webSwing.play();
  }
  else if(state.cpuAttack === 'Spider Sting!') {
    state.cpuSprite = './images/spidey-sting.gif';
    spiderSting.play();
  }
  state.healString = randomString(8,'aA');
  state.playerHP -= 3;
  state.playerSprite = './images/kenshin-hit.gif';

  var playerHit = document.getElementById('playerHit');
  playerHit.play();


  gameState();

}

function endFight() {
  clearInterval(intervalId);

  if(state.playerHP < 1) {
    state.text = "You lost! Try again.";
    state.playerAttack = 'I was going easy on you.';
    state.cpuAttack = 'One for J.J.';
    state.playerSprite = './images/kenshin-dead.gif';
    state.cpuSprite = './images/spidey-win.gif';
    state.healString = '';
    battleTheme.pause();
    danger.pause();
    warning.pause();
    var gameOver = document.getElementById('gameOver');
    var dna = document.getElementById('dna');
    var kneel = document.getElementById('kneel');
    var gameOverSounds = [
      gameOver,
      dna,
      kneel
    ];
    randomIndexing(gameOverSounds).play();



    var promise = $.ajax({
      url: '/player-progress',
      method: 'POST',
      data: {
        losses: 1
      }
    });


  }

  if(state.cpuHP < 1) {
    state.text = 'Awesome! You won!';
    state.playerAttack = "You should keep practicing."
    state.cpuAttack = 'Uncle Ben! I failed you. ';
    state.playerSprite = './images/kenshin-win.gif';
    state.cpuSprite = './images/spidey-dead.gif';
    state.healString = '';
    battleTheme.pause();
    var victory = document.getElementById('victory');
    victory.play();
  }

  var promise = $.ajax({
    url: '/player-progress',
    method: 'POST',
    data: {
      wins: 1
    }
  });

}


store.actions.startFight = function() {
  state.text = 'Type Fight!';
  state.playerSprite = './images/kenshin-ready.gif';
  state.cpuSprite = './images/spidey-ready.gif';

  battleTheme = document.getElementById('battleTheme');
  battleTheme.play();
  var mainTheme = document.getElementById('mainTheme');
  mainTheme.pause();


  intervalId = setInterval(intervalRounds, 5000);
  changed();
}

store.actions.attack = function(evt) {
  var suckTaunt = document.getElementById('suckTaunt');
  var laughTaunt = document.getElementById('laughTaunt');
  var patheticTaunt = document.getElementById('patheticTaunt');
  var bradleyTaunt = document.getElementById('bradleyTaunt');
  var cpuHit = document.getElementById('cpuHit');

  var missTaunts = [
    suckTaunt,
    laughTaunt,
    patheticTaunt,
    bradleyTaunt
  ];

  if(evt.keyCode === 13) {
    var damage = Math.floor(Math.random() * 10);
    state.cpuTaunt = '';
    if(evt.target.value === 'ForwardS') {
      state.playerAttack = 'Forward Slash!';
      var forwardSlash = document.getElementById('forwardSlash');
      forwardSlash.play();
      state.playerSprite = './images/kenshin-forward-slash.gif';
      if(damage >= 4) {
        state.cpuHP -= 3;
        state.cpuSprite = './images/spidey-hit.gif';
        cpuHit.play();
      }
      else {
        state.cpuHP += 0;
        state.cpuTaunt = 'Spider Sense tingling.';
        randomIndexing(missTaunts).play();
      }
    }
    else if(evt.target.value === 'ChargeS') {
      state.playerAttack = 'Charging Slash!';
      var chargingSlash = document.getElementById('chargingSlash');
      chargingSlash.play();
      state.playerSprite = './images/kenshin-chargeslash.gif';

      if(damage >= 4) {
        state.cpuHP -= 3;
        state.cpuSprite = './images/spidey-hit.gif';
        cpuHit.play();

      }
      else {
        state.cpuHP += 0;
        state.cpuTaunt = 'Spider Sense tingling.';
        randomIndexing(missTaunts).play();

      }
    }
    else if(evt.target.value === 'UpwardS') {
      state.playerAttack = 'Upward Slash!';
      var upwardSlash = document.getElementById('upwardSlash');
      upwardSlash.play();
      state.playerSprite = './images/kenshin-upslash.gif';
      if(damage >= 4) {
        state.cpuHP -= 3;
        state.cpuSprite = './images/spidey-hit.gif';
        cpuHit.play();

      }
      else {
        state.cpuHP += 0;
        state.cpuTaunt = 'Spider Sense tingling.';
        randomIndexing(missTaunts).play();

      }
    }
    else if(evt.target.value === state.healString) {
      var gokuHeal = document.getElementById('gokuHeal');
      var dendeHeal = document.getElementById('dendeHeal');

      var healSounds = [
        gokuHeal,
        dendeHeal
      ];

        state.playerHP += 3;
        state.playerAttack = "Just a scratch";
        state.playerSprite = './images/kenshin-ready.gif';
        randomIndexing(healSounds).play();
      }
    else {
      state.playerAttack = "Sorry, I don't know that move.";
      state.playerSprite = './images/kenshin-no-move.gif';
    }
    evt.target.value = '';
    gameState();
  }
}

store.actions.load = function() {
  console.log('loading');

  $.ajax({
    url: '/player-progress',
    method: 'GET'
  })
  .done(function(data) {
    console.log(data);
    state.data = data;
    console.log(state);
    changed();

  });
}



module.exports = store;

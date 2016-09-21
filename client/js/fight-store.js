var $ = require('jquery');
import audioPlay from './audio-play.js';
import ProgressStore from './progress-store.js';


var intervalId;
var battleMusic;
var battleTheme;






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
  playerInput: 'input-hide',
  playerBubble: 'player-bubble-hide',
  cpuBubble: 'cpu-bubble-hide',
  missBubble: 'miss-bubble-hide',
  wins: 0,
  losses: 0,
  clickForProgress: '',
  rematch: ''

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
    playerInput: state.playerInput,
    playerBubble: state.playerBubble,
    cpuBubble: state.cpuBubble,
    missBubble: state.missBubble,
    wins: state.wins,
    losses: state.losses,
    clickForProgress: state.clickForProgress,
    rematch: state.rematch
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

  if(state.playerHP < 8) {
    state.text = 'Warning!';
    state.playerStatus = 'warningHP';
    state.playerSprite = './images/kenshin-warning.gif';
    audioPlay.playWarning();
  }
  if(state.playerHP < 5) {
    state.text = 'Danger!';
    state.playerStatus = 'dangerHP';
    state.playerSprite = './images/kenshin-danger.gif';
    audioPlay.playDanger();
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

  state.cpuBubble = 'cpu-bubble-show';
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
  state.healString = randomString(4,'aA');
  state.playerHP -= 3;
  state.playerSprite = './images/kenshin-hit.gif';

  var playerHit = document.getElementById('playerHit');
  playerHit.play();


  gameState();

}

function endFight() {
  clearInterval(intervalId);
  var id = getUserId();


  if(state.playerHP < 1) {
    state.text = "You lost! Try again.";
    state.clickForProgress = 'Click to see your Progress!';
    state.rematch = 'Rematch!';
    state.playerAttack = 'I was going easy on you.';
    state.cpuAttack = 'One for J.J.';
    state.playerSprite = './images/kenshin-dead.gif';
    state.cpuSprite = './images/spidey-win.gif';
    state.healString = '';
    state.playerInput = 'input-hide';
    state.missBubble =  'miss-bubble-hide';
    battleTheme.pause();
    audioPlay.pauseDanger();
    audioPlay.pauseWarning();
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
      url: '/player-progress/' + id,
      method: 'POST',
      data: {
        wins: 0,
        losses: 1
      }
    });

    // ProgressStore.actions.lose();




  }

  if(state.cpuHP < 1) {
    state.text = 'Awesome! You won!';
    state.clickForProgress = 'Click to see your Progress!';
    state.rematch = 'Rematch!';
    state.playerAttack = "You should keep practicing."
    state.cpuAttack = 'Uncle Ben! I failed you. ';
    state.playerSprite = './images/kenshin-win.gif';
    state.cpuSprite = './images/spidey-dead.gif';
    state.healString = '';
    state.playerInput = 'input-hide';
    state.missBubble =  'miss-bubble-hide';
    battleTheme.pause();
    var victory = document.getElementById('victory');
    victory.play();


    var promise = $.ajax({
      url: '/player-progress/' + id,
      method: 'POST',
      data: {
        wins: 1,
        losses: 0
      }
    });
  }



}


store.actions.startFight = function() {
  state.text = 'Type Fight!';
  state.playerSprite = './images/kenshin-ready.gif';
  state.cpuSprite = './images/spidey-ready.gif';
  state.playerInput = 'input-show';
  state.playerHP = 30;
  state.cpuHP = 20;

  var MKTheme = document.getElementById('MKTheme');
  var GuileTheme = document.getElementById('GuileTheme');
  var FF7BossTheme = document.getElementById('FF7BossTheme');

  battleMusic = [
    MKTheme,
    GuileTheme,
    FF7BossTheme
  ];

  battleTheme = randomIndexing(battleMusic);
  battleTheme.play();
  var mainTheme = document.getElementById('mainTheme');
  mainTheme.pause();


  intervalId = setInterval(intervalRounds, 20000);
  changed();
}

store.actions.attack = function(evt) {

  var cpuHit = document.getElementById('cpuHit');
  var laughTaunt = document.getElementById('laughTaunt');
  var patheticTaunt = document.getElementById('patheticTaunt');
  var suckTaunt = document.getElementById('suckTaunt');

  var missTaunts = [
    laughTaunt,
    patheticTaunt,
    suckTaunt
  ];

  if(evt.keyCode === 13) {
    state.playerBubble = 'player-bubble-show';
    var damage = Math.floor(Math.random() * 10);
    state.cpuTaunt = '';
    if(evt.target.value === 'ForwardS') {
      state.playerAttack = 'Forward Slash!';
      audioPlay.playForwardSlash();
      state.playerSprite = './images/kenshin-forward-slash.gif';
      if(damage >= 5) {
        state.cpuHP -= 3;
        state.cpuSprite = './images/spidey-hit.gif';
        cpuHit.play();
      }
      else {
        state.cpuHP += 0;
        state.missBubble = 'miss-bubble-show';
        state.cpuTaunt = 'Spider Sense tingling.';
        randomIndexing(missTaunts).play();
      }
    }
    else if(evt.target.value === 'ChargeS') {
      state.playerAttack = 'Charging Slash!';
      var chargingSlash = document.getElementById('chargingSlash');
      chargingSlash.play();
      state.playerSprite = './images/kenshin-chargeslash.gif';

      if(damage >= 5) {
        state.cpuHP -= 3;
        state.cpuSprite = './images/spidey-hit.gif';
        cpuHit.play();

      }
      else {
        state.cpuHP += 0;
        state.missBubble = 'miss-bubble-show';
        state.cpuTaunt = 'Spider Sense tingling.';
        randomIndexing(missTaunts).play();

      }
    }
    else if(evt.target.value === 'UpwardS') {
      state.playerAttack = 'Upward Slash!';
      var upwardSlash = document.getElementById('upwardSlash');
      upwardSlash.play();
      state.playerSprite = './images/kenshin-upslash.gif';
      if(damage >= 5) {
        state.cpuHP -= 3;
        state.cpuSprite = './images/spidey-hit.gif';
        cpuHit.play();

      }
      else {
        state.cpuHP += 0;
        state.missBubble = 'miss-bubble-show';
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
      state.playerBubble = 'player-bubble-show';
      state.playerSprite = './images/kenshin-no-move.gif';
    }
    evt.target.value = '';
    gameState();
  }
}

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
  return id;
}

store.actions.load = function() {
  console.log('loading');

  var id = getUserId();


  $.ajax({
    url: '/player-progress/' + id,
    method: 'GET',
  })
  .done(function(data) {
    console.log(data);
    state.wins = data.stats.wins;
    state.losses = data.stats.losses;

    console.log(state);
    changed();

  });
}



module.exports = store;

var $ = require('jquery');
import audioPlay from './audio-play.js';
import ProgressStore from './progress-store.js';


var intervalId;
var battleMusic;
var battleTheme;
var difficulty;





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
  fightScreenTitleText: 'Click to begin',
  cpuAttackMessage: '',
  playerAttackMessage: '',
  playerHP: 15,
  playerStatusClass: 'healthyHP',
  cpuHP: 24,
  cpuStatusClass: 'healthyHP',
  healString: '',
  cpuTauntMessage: '',
  playerSpriteUrls: './images/kenshin-start.gif',
  cpuSpriteUrls: './images/spidey-start.gif',
  showPlayerInput: false,
  showPlayerBubble: false,
  showCpuBubble: false,
  showMissBubble: false,
  wins: 0,
  losses: 0,
  showClickForProgress: '',
  showRematch: false,
  difficultyChosen: ''


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
    fightScreenTitleText : state.fightScreenTitleText,
    cpuAttackMessage: state.cpuAttackMessage,
    playerAttackMessage: state.playerAttackMessage,
    playerHP: state.playerHP,
    playerStatusClass: state.playerStatusClass,
    cpuHP: state.cpuHP,
    cpuStatusClass: state.cpuStatusClass,
    healString: state.healString,
    cpuTauntMessage: state.cpuTauntMessage,
    playerSpriteUrls: state.playerSpriteUrls,
    cpuSpriteUrls: state.cpuSpriteUrls,
    showPlayerInput: state.showPlayerInput,
    showPlayerBubble: state.showPlayerBubble,
    showCpuBubble: state.showCpuBubble,
    showMissBubble: state.showMissBubble,
    wins: state.wins,
    losses: state.losses,
    showClickForProgress: state.showClickForProgress,
    showRematch: state.showRematch,
    difficultyChosen: state.difficultyChosen

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
    state.fightScreenTitleText = 'Warning!';
    state.playerStatusClass = 'warningHP';
    state.playerSpriteUrls = './images/kenshin-warning.gif';
    audioPlay.playWarning();
  }
  if(state.playerHP < 5) {
    state.fightScreenTitleText = 'Danger!';
    state.playerStatusClass = 'dangerHP';
    state.playerSpriteUrls = './images/kenshin-danger.gif';
    audioPlay.playDanger();
  }

  if(state.playerHP <= 0) {
    state.playerHP = 0;
  }


  if(state.cpuHP < 8) {
    state.cpuStatusClass = 'warningHP';
    state.cpuSpriteUrls = './images/spidey-warning.gif';
  }

  if(state.cpuHP < 5) {
    state.cpuStatusClass = 'dangerHP';
    state.cpuSpriteUrls = './images/spidey-danger.gif';
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

  state.showCpuBubble = true;
  state.cpuAttackMessage = randomIndexing(cpuAttacks);
  if(state.cpuAttackMessage === 'Web Ball!') {
    state.cpuSpriteUrls = './images/spidey-web-ball.gif';
    audioPlay.webBall();
  }
  else if(state.cpuAttackMessage === 'Web Swing!') {
    state.cpuSpriteUrls = './images/spidey-kick.gif';
    audioPlay.webSwing();
  }
  else if(state.cpuAttackMessage === 'Spider Sting!') {
    state.cpuSpriteUrls = './images/spidey-sting.gif';
    audioPlay.spiderSting();
  }

  if(state.difficultyChosen === 'Easy') {
    state.healString = randomString(4, 'aA');
  }
  else if(state.difficultyChosen === 'Medium') {
    state.healString = randomString(6, 'aA');
  }
  else if(state.difficultyChosen === 'Hard') {
    state.healString = randomString(8, 'aA');
  }

  state.playerHP -= 3;
  state.playerSpriteUrls = './images/kenshin-hit.gif';

  audioPlay.playerHit();


  gameState();

}

function endFight() {
  clearInterval(intervalId);
  var id = getUserId();


  if(state.playerHP < 1) {
    state.fightScreenTitleText = "You lost! Try again.";
    state.showClickForProgress = 'Click to see your Progress!';
    state.showRematch = true;
    state.playerAttackMessage = 'I was going easy on you.';
    state.cpuAttackMessage = 'One for J.J.';
    state.playerSpriteUrls = './images/kenshin-dead.gif';
    state.cpuSpriteUrls = './images/spidey-win.gif';
    state.healString = '';
    state.showPlayerInput = false;
    state.showMissBubble =  false;
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
        losses: 1,
        difficultyChosen: state.difficultyChosen

      }
    });

  }

  if(state.cpuHP < 1) {
    state.fightScreenTitleText = 'Awesome! You won!';
    state.showClickForProgress = 'Click to see your Progress!';
    state.showRematch = true;
    state.playerAttackMessage = "You should keep practicing."
    state.cpuAttackMessage = 'Uncle Ben! I failed you. ';
    state.playerSpriteUrls = './images/kenshin-win.gif';
    state.cpuSpriteUrls = './images/spidey-dead.gif';
    state.healString = '';
    state.showPlayerInput = false;
    state.showMissBubble =  false;
    battleTheme.pause();
    audioPlay.victory();


    var promise = $.ajax({
      url: '/player-progress/' + id,
      method: 'POST',
      data: {
        wins: 1,
        losses: 0,
        difficultyChosen: state.difficultyChosen
      }
    });
  }

}



store.actions.startFight = function() {
  if (difficulty === undefined) {
    alert('Please select CPU Difficulty');
  }
  disableDropDown();


  state.fightScreenTitleText = 'Type Fight!';
  state.playerSpriteUrls = './images/kenshin-ready.gif';
  state.cpuSpriteUrls = './images/spidey-ready.gif';
  state.showPlayerInput = true;
  state.showRematch = false;
  state.showClickForProgress = '';
  state.playerHP = 15;
  state.cpuHP = 24;

  var MKTheme = document.getElementById('MKTheme');
  var GuileTheme = document.getElementById('GuileTheme');
  var FF7BossTheme = document.getElementById('FF7BossTheme');
  var OneWingedAngel = document.getElementById('OneWingedAngel');

  battleMusic = [
    MKTheme,
    GuileTheme,
    FF7BossTheme,
    OneWingedAngel
  ];

  battleTheme = randomIndexing(battleMusic);
  battleTheme.play();
  mainTheme.pause();


  intervalId = setInterval(intervalRounds, 6000);
  changed();
}

store.actions.attack = function(evt) {

  var laughTaunt = document.getElementById('laughTaunt');
  var patheticTaunt = document.getElementById('patheticTaunt');
  var suckTaunt = document.getElementById('suckTaunt');

  var missTaunts = [
    laughTaunt,
    patheticTaunt,
    suckTaunt
  ];

  if(evt.keyCode === 13) {
    state.showPlayerBubble = true;
    var damage = Math.floor(Math.random() * 10);
    state.cpuTauntMessage = '';
    if(evt.target.value === 'ForwardS') {
      state.playerAttackMessage = 'Forward Slash!';
      audioPlay.forwardSlash();
      state.playerSpriteUrls = './images/kenshin-forward-slash.gif';
      if(damage >= 5) {
        state.cpuHP -= 3;
        state.cpuSpriteUrls = './images/spidey-hit.gif';
        audioPlay.cpuHit();
      }
      else {
        state.cpuHP += 0;
        state.showMissBubble = true;
        state.cpuTauntMessage = 'Spider Sense tingling.';
        randomIndexing(missTaunts).play();
      }
    }
    else if(evt.target.value === 'ChargeS') {
      state.playerAttackMessage = 'Charging Slash!';
      audioPlay.chargingSlash();
      state.playerSpriteUrls = './images/kenshin-chargeslash.gif';

      if(damage >= 5) {
        state.cpuHP -= 3;
        state.cpuSpriteUrls = './images/spidey-hit.gif';
        audioPlay.cpuHit();

      }
      else {
        state.cpuHP += 0;
        state.showMissBubble = true;
        state.cpuTauntMessage = 'Spider Sense tingling.';
        randomIndexing(missTaunts).play();

      }
    }
    else if(evt.target.value === 'UpwardS') {
      state.playerAttackMessage = 'Upward Slash!';
      audioPlay.upwardSlash();
      state.playerSpriteUrls = './images/kenshin-upslash.gif';
      if(damage >= 5) {
        state.cpuHP -= 3;
        state.cpuSpriteUrls = './images/spidey-hit.gif';
        audioPlay.cpuHit();

      }
      else {
        state.cpuHP += 0;
        state.showMissBubble = true;
        state.cpuTauntMessage = 'Spider Sense tingling.';
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
        state.playerAttackMessage = "Just a scratch";
        state.playerSpriteUrls = './images/kenshin-ready.gif';
        randomIndexing(healSounds).play();
      }
    else {
      state.playerAttackMessage = "Sorry, I don't know that move.";
      state.showPlayerBubble = true;
      state.playerSpriteUrls = './images/kenshin-no-move.gif';
      audioPlay.wrongInput();
    }
    evt.target.value = '';
    gameState();
  }
}

function getUserId() {
  var userGoogleID = localStorage.getItem('googleID');

  if (userGoogleID) {
    console.log('google id', userGoogleID);
  }


  return userGoogleID;
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
    state.difficultyChosen = data.stats.difficultyChosen;

    console.log(state);
    changed();

  });
}

store.actions.cpuDifficulty = function() {
  difficulty = document.querySelector('#difficulty');
  state.difficultyChosen = difficulty.options[difficulty.selectedIndex].value;

}

function disableDropDown() {
  difficulty.disabled=true;
}

function enableDropDown() {
  difficulty.disabled=false;
}




module.exports = store;

var $ = require('jquery');


var intervalId;
var battleTheme;
var danger;
var warning;

var cpuAttacks = [
  'Shuriken Throw!',
  'Susano!',
  'Fire ball!',
];


function randomCPUAttack() {
  var randomIndex = Math.floor(Math.random() * cpuAttacks.length);
  return cpuAttacks[randomIndex];
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
  playerHP: 12,
  playerStatus: 'healthyHP',
  cpuHP: 10,
  cpuStatus: 'healthyHP',
  healString: '',
  cpuTaunt: ''

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
    cpuTaunt: state.cpuTaunt
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
    warning.play();
  }
  if(state.playerHP < 5) {
    state.text = 'Danger!';
    state.playerStatus = 'dangerHP';
    danger.play();
  }

  if(state.cpuHP < 8) {
    state.cpuStatus = 'warningHP';
  }

  if(state.cpuHP < 5) {
    state.cpuStatus = 'dangerHP';
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


  state.cpuAttack = randomCPUAttack();
  state.healString = randomString(8,'aA');
  state.playerHP -= 3;
  var playerHit = document.getElementById('playerHit');
  playerHit.play();


  gameState();

}

function endFight() {
  clearInterval(intervalId);

  if(state.playerHP < 1) {
    state.text = "You lost! Try again.";
    state.playerAttack = 'I lost to a human? Impossible!';
    state.cpuAttack = 'My Sharingan is superior!';
    state.healString = '';
    battleTheme.pause();
    danger.pause();
    warning.pause();
    var gameOver = document.getElementById('gameOver');
    gameOver.play();

  }

  if(state.cpuHP < 1) {
    state.text = 'Awesome! You won!';
    state.playerAttack = "That's why I'm King Fuhrer."
    state.cpuAttack = 'I lost! My ninjitsu failed me.';
    state.healString = '';
    battleTheme.pause();
    var victory = document.getElementById('victory');
    victory.play();
  }


}


store.actions.startFight = function() {
  state.text = 'Type Fight!';

  battleTheme = document.getElementById('battleTheme');
  battleTheme.play();
  var mainTheme = document.getElementById('mainTheme');
  mainTheme.pause();


  intervalId = setInterval(intervalRounds, 3000);
  changed();
}

store.actions.attack = function(evt) {
  var cpuHit = document.getElementById('cpuHit');
  var missTaunt = document.getElementById('missTaunt');
  if(evt.keyCode === 13) {
    var damage = Math.floor(Math.random() * 10);
    state.cpuTaunt = '';
    if(evt.target.value === 'LightSlash') {
      state.playerAttack = 'Lightning Slash!';
      if(damage >= 4) {
        state.cpuHP -= 3;
        cpuHit.play();
      }
      else {
        state.cpuHP += 0;
        state.cpuTaunt = 'Ha! You missed!';
        missTaunt.play();
      }
    }
    else if(evt.target.value === 'TripStab') {
      state.playerAttack = 'Triple Stab!';
      if(damage >= 4) {
        state.cpuHP -= 3;
        cpuHit.play();

      }
      else {
        state.cpuHP += 0;
        state.cpuTaunt = 'Ha! You missed!';
        missTaunt.play();
      }
    }
    else if(evt.target.value === 'UpCut') {
      state.playerAttack = 'Upward Cut!';
      if(damage >= 4) {
        state.cpuHP -= 3;
        cpuHit.play();

      }
      else {
        state.cpuHP += 0;
        state.cpuTaunt = 'Ha! You missed!';
        missTaunt.play();
      }
    }
    else if(evt.target.value === state.healString) {
        state.playerHP += 3;
        state.playerAttack = "Puny attacks can't harm me!";
        var bradleyHeal = document.getElementById('bradleyHeal');
        bradleyHeal.play();
      }
    else {
      state.playerAttack = 'That attack is beneath me, human.';
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

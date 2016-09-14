var intervalId;

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
  text: 'Click to begin',
  cpuAttack: '',
  playerAttack: '',
  playerHP: 10,
  cpuHP: 10,
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
    text : state.text,
    cpuAttack: state.cpuAttack,
    playerAttack: state.playerAttack,
    playerHP: state.playerHP,
    cpuHP: state.cpuHP,
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

function fightRounds() {

  state.cpuAttack = randomCPUAttack();
  state.healString = randomString(8,'aA');
  state.playerHP -= 3;

  if(state.playerHP < 8) {
    state.text = 'Caution!';
  }
  if(state.playerHP < 5) {
    state.text = 'Danger!';
  }
  if(state.playerHP < 1 || state.cpuHP < 1) {
    endIntervalFight();
  }
  changed();
}

function endIntervalFight() {
  clearInterval(intervalId);
  if(state.playerHP < 1) {
    state.text = "You must defeat my Sharingan to stand a chance.";
  }
  if(state.cpuHP < 1) {
    state.text = 'You cannot keep up with the King Fuhrer.'
  }
  changed();
}

function endInputFight() {

}

store.actions.startFight = function() {
  state.text = 'Type Fight!';

  intervalId = setInterval(fightRounds, 20000);
  changed();
}

store.actions.heal = function(evt) {
  if(evt.keyCode === 13) {
    if(evt.target.value === state.healString) {
      state.playerHP += 3;
    }
    evt.target.value = '';
  }
  changed();
}

store.actions.attack = function(evt) {

  if(evt.keyCode === 13) {
    var damage = Math.floor(Math.random() * 10);
    state.cpuTaunt = '';
    if(evt.target.value === 'LightSlash') {
      state.playerAttack = 'Lightning Slash!';
      if(damage >= 4) {
        state.cpuHP -= 3;
      }
      else {
        state.cpuHP += 0;
        state.cpuTaunt = 'Ha! You missed!';
      }
    }
    else if(evt.target.value === 'TripStab') {
      state.playerAttack = 'Triple Stab!';
      if(damage >= 4) {
        state.cpuHP -= 3;
      }
      else {
        state.cpuHP += 0;
        state.cpuTaunt = 'Ha! You missed!';
      }
    }
    else if(evt.target.value === 'UpCut') {
      state.playerAttack = 'Upward Cut!';
      if(damage >= 4) {
        state.cpuHP -= 3;
      }
      else {
        state.cpuHP += 0;
        state.cpuTaunt = 'Ha! You missed!';
      }
    }
    else {
      state.playerAttack = 'That attack is beneath me, human.';
    }
    evt.target.value = '';
  }
  changed();
}

module.exports = store;

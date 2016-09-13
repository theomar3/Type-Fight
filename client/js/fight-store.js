var intervalId;

var cpuAttacks = [
  'Shuriken Throw!',
  'Susano!',
  'Fire ball!',
]

function randomCPUAttack() {
  var randomIndex = Math.floor(Math.random() * cpuAttacks.length);
  return cpuAttacks[randomIndex];
}

function randomString(length, chars) {
    var string = '';
    if (chars.indexOf('a') > -1) string += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) string += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) string += '0123456789';
    if (chars.indexOf('!') > -1) string += '`!@#$%&()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += string[Math.round(Math.random() * (string.length - 1))];
    return result;
}


var state = {
  text: 'Click to begin',
  cpuAttack: '',
  playerHP: 10,
  dodgeString: ''

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
    playerHP: state.playerHP,
    dodgeString: state.dodgeString
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
  state.dodgeString = randomString(8,'aA!');

  state.playerHP -= 3;
  if(state.playerHP < 8) {
    state.text = 'Caution!';
  }
  if(state.playerHP < 5) {
    state.text = 'Danger!';
  }
  if(state.playerHP < 1) {
    endFight();
  }
  changed();
}

function endFight() {
  clearInterval(intervalId);
  state.text = "You must defeat my Sharingan to stand a chance.";
  changed();
}

store.actions.startFight = function() {
  state.text = 'Type Fight!';

  intervalId = setInterval(fightRounds, 1000);
  changed();
}

// store.actions.dodge = function(evt) {
//   if(evt.keyCode === 13) {
//     if(evt.target.value === state.dodgeString) {
//       state.playerHP = state.playerHP;
//     }
//     else {
//       state.playerHP -= 3;
//     }
//   }
//   changed();
// }

module.exports = store;

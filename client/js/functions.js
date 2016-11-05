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


// for dodge input
_dodgeInput(evt) {
  if(evt.keyCode === randomString()) {
    playerHP = playerHP;
  }
  else {
    playerHP -= this.damage;
  }
}





var playerHP = 10;
var cpuHP = 10;

function playerHP() {
  var hp = 10;
  return hp;
}

function cpuHP() {
  var hp = 10;
  return hp;
}





this.state = {
  text: 'Click to begin'
}

_clickFightTitle() {
  this.setState({
    text: 'Type Fight!'
  })
}





function endOfBattleMessage() {
  if (playerHP < 1) {
    this.setState({
      text: 'Keep practicing!'
    })
  }
  else if(cpuHP < 1) {
    this.setState({
      text: 'You win!'
    })
  }
}





var buuMoves = [
  'Kmha',
  'Chcl',
  'Regn',
]

var gokuMoves = [
  'Kmha',
  'Disk',
  'Cmbo',
]

// for input
function buuMoves(evt) {
  if(evt.keyCode === 'Kmha') {
    var command = 'Kamehameha!';
    return command; //in the dialogue box
  }
  else if(evt.keyCode === 'Chcl') {
    var command = 'Chocolate Beam!';
    return command;
  }
  else if(evt.keyCode === 'Regn') {
    var command = 'Regenerating';
    this.playerHP += 3;
    return command;
  }
}


function moveDamage() {
  var damage = 0;

  Kmha, Chcl,Disk = 3 damage
  Cmbo = 1 damage per attack

}




_playerCommandDialogue() {
  this.setState({
    playerCommand: this.store.copyState()
  })
}

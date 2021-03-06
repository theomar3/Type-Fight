var $ = require('jquery');
import getUserId from './user-id.js';



var state =
[  {
    wins: 0,
    losses: 0,
    difficultyChosen: ''
  }]


var store = {
  listeners: [],
  actions: {}
}


store.addListener = function(listener) {
  store.listeners.push(listener);
}

store.copyState = function() {
  return state.slice(0);
}

function changed() {
  console.log('store changed', state);
  var copiedState = store.copyState()
  store.listeners.forEach(function(listener) {
    listener(copiedState);
  });
}

/* ========================================= */
/* Actions                                   */
/* ========================================= */

store.actions.saveLoseProgress = function(difficultyChosen) {
  var id = getUserId();
  console.log("user id", id);
  var promise = $.ajax({
    url: '/player-progress/' + id,
    method: 'POST',
    data: {
      wins: 0,
      losses: 1,
      difficultyChosen: difficultyChosen

    }
  });
}

store.actions.saveWinProgress = function(difficultyChosen) {
  var id = getUserId();
  var promise = $.ajax({
    url: '/player-progress/' + id,
    method: 'POST',
    data: {
      wins: 1,
      losses: 0,
      difficultyChosen: difficultyChosen
    }
  });
}

store.actions.loadProgress = function() {
  var id = getUserId();
  $.ajax({
    url: '/player-progress/' + id,
    method: 'GET',
  })
  .done(function(data) {
    console.log(data);

    state = data;
    changed();
  });

}

module.exports = store;

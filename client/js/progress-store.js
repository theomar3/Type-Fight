var $ = require('jquery');


var state = {

}

var store = {
  listeners: [],
  actions: {}
}


store.addListener = function(listener) {
  store.listeners.push(listener);
}

store.copyState = function() {
  return {
  };
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

store.actions.saveLoseProgress = function() {
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

store.actions.saveWinProgress = function() {
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

store.actions.loadProgress = function() {

}




module.exports = store;

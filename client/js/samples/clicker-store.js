//If you will be doing any ajax calls in the actions, uncomment this.
//var $ = require('jquery');

/* ========================================= */
/* Store Setup                               */
/* ========================================= */

//customize to whatever makes sense for your state. For the clicker, we only need the count.
var state = {
  count: 0
}

//stores will need to keep track of listeners for changes and actions.
var store = {
  listeners: [], //for keeping tracking of components listening for change events
  actions: {} //for actions, see below
}

//What a component will call so it can pass a callback/listener for change events
store.addListener = function(listener) {
  store.listeners.push(listener);
}

//Makes a copy of the state. This is to protect the state that is managed by the store.
store.copyState = function() {
  return {
    count: state.count
  };
}

//To be called any time the state is changed.
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

//Action to increment the state
store.actions.increment = function() {
  state.count = state.count + 1; //change the state
  changed(); //since the state just got changed, call the change function
}

module.exports = store;

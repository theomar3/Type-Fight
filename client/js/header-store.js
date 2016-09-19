var $ = require('jquery');


// var state = {
//   flyInText: 'fly-in-text',
//   hidden: 'hidden'
// }

var store = {
  listeners: [],
  actions: {}
}


store.addListener = function(listener) {
  store.listeners.push(listener);
}

// store.copyState = function() {
//   return {
//     flyInText: state.flyInText,
//     hidden: state.hidden
//   };
// }

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

store.actions.load = function() {
  setTimeout(function() {
      $('.fly-in-text').removeClass('hidden');
  }, 3000);

})();

}

module.exports = store;

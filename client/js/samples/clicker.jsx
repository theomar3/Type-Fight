import React from 'react';
import store from './clicker-store.js';

class Clicker extends React.Component {

  constructor() {
    super();

    this.state = store.copyState();
  }

  componentDidMount() {
    var self = this;
    store.addListener(function(state) {
      self.setState(state);
    });
  }

  _onClick() {
    store.actions.increment()
  }

  render() {
    var self = this;

    return (
      <div>
        <div onClick={function() { self._onClick(); }}>Click me: {this.state.count}</div>
      </div>
    )
  }
}

module.exports = FluxComponent;

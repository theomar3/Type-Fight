import React from 'react';
import store from './fight-store.js';


class MoveList extends React.Component {

  constructor() {
    super();

    this.state = store.copyState();

  }

  componentWillMount() {

    this.listeningFunc = (state) => {
      this.setState(state);
    }
    store.addListener(this.listeningFunc);
  }

  componentWillUnmount() {
    store.removeListener(this.listeningFunc);
  }


  render() {

    return(
      <div className = 'row'>
        <div className = 'col four'></div>
        <div className='col four'>
          <div className = "attack-command-section">
            <p className='move-list-title'> ATTACK COMMANDS </p>
            <div className="move-list-items">
              {this.state.attackCommand}
            </div>
          </div>
        </div>
        <div className = 'col four'></div>
      </div>
    );
  }
}

module.exports = MoveList;

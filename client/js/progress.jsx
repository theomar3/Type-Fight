var React = require('react');
import store from './fight-store.js';

class Progress extends React.Component {
  constructor() {
    super();

    store.actions.load();

    this.state = store.copyState();

    store.addListener(state => {
      this.setState(state);
    })
  }

  render () {
    return (
      <div>
        <h1 className='website-title progress-title'>Your Progress</h1>
        <h3 className='tagline'> Check how you're doing!</h3>

        <h4 id="stats-heading"> Player Stats</h4>
          {/*Try to put username instead of "Player"*/}

          <ul>
            <li>Wins: {this.state.wins}</li>
            <li> Losses: {this.state.losses}</li>
          </ul>

      </div>
    );
  }
}

module.exports = Progress;

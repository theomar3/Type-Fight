var React = require('react');
import store from './fight-store.js';
import ProgressStore from './progress-store.js';

class Progress extends React.Component {
  constructor() {
    super();

    store.actions.load();

    this.state = store.copyState();

    store.addListener(state => {
      this.setState(state);
    });

    ProgressStore.addListener(state => {
      this.setState(state);
    });
  }


  render () {
    return (
      <div>
        <h1 className='website-title progress-title'>Your Progress</h1>
        <h3 className='progress-tagline'> Check how you're doing!</h3>

        <h4 id="stats-heading"> Player Stats</h4>

          <table id="stats-table">
            <tr id='HeadRow'>
              <td> Wins </td>
              <td> Losses </td>
            </tr>

            <tr>
              <td tableHeadData = "Wins"> {this.state.wins} </td>
              <td tableHeadData = 'Losses'> {this.state.losses} </td>
            </tr>
          </table>

      </div>
    );
  }
}

module.exports = Progress;

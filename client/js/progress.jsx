 var React = require('react');
import ProgressStore from './progress-store.js';
import BackButton from './backbutton.jsx';

class Progress extends React.Component {
  constructor() {
    super();

    ProgressStore.actions.loadProgress();

    this.state =
    {
      stats: ProgressStore.copyState()
    }
    console.log('copy state', ProgressStore.copyState());

    ProgressStore.addListener(state => {
      console.log('progres compononent state', state)
      this.setState({
        stats: state
      });
    });



  }


  render () {
    function playerStats(i) {
      return <tr key={i.difficultyChosen}>
        <td>{i.wins}</td>
        <td>{i.losses}</td>
        <td>{i.difficultyChosen}</td>
      </tr>
    }

    return (
      <div className = 'row'>
        <div className ='container col twelve'>

          <div className='row'>
            <div className='col one'></div>
            <div className='col ten'>
              <h1 className='website-title progress-title animated slideInDown'>
                 Your
              </h1>
              <h1 className='website-title progress-title animated slideInUp'>
                 Progress
              </h1>
            </div>
            <div className='col one'></div>
          </div>

          <div className='row'>
            <div className='col one'></div>
            <div className='col ten'>
              <h3 className='progress-tagline animated pulse'> Check how you're doing!</h3>
            </div>
            <div className='col one'></div>
          </div>

          <div className='row'>
            <div className='col one'></div>
            <div className='col ten'>
              <h4 id="stats-heading"> Player Stats</h4>
              <table id="stats-table">
                <thead>
                  <tr>
                    <td> Wins </td>
                    <td> Losses </td>
                    <td> CPU Difficulty </td>
                  </tr>
                </thead>

                <tbody>
                  {this.state.stats.map(playerStats)}
                </tbody>
              </table>
            </div>
            <div className='col one'></div>
          </div>

          <div className='row'>
            <div className='col two'></div>
            <div className='col two'>
              <BackButton />
            </div>
            <div className='col four'></div>
            <div className='col two'>
              <a href="index.html">
                <button id='homepage-link'>
                  *Lemme Google Sign-In!
                </button>
              </a>
            </div>
            <div className='col two'></div>
          </div>


          <div className='row'>
            <div className='col seven'></div>
            <div className='col five'>
              <p id='sign-in-info'> *(Psst. That way you can check your progress from around the world.)</p>
            </div>
          </div>





        </div>
      </div>
    );
  }
}

module.exports = Progress;

var React = require('react');
import store from './fight-store.js';
import ProgressStore from './progress-store.js';
import BackButton from './backbutton.jsx';

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
      <div className = 'row'>
        <div className ='container col twelve'>

          <div className='row'>
            <div className='col one'></div>
            <div className='col ten'>
              <h1 className='website-title progress-title animated bounceInLeft'>
                 Your
              </h1>
              <h1 className='website-title progress-title animated bounceInRight'>
                 Progress
              </h1>
            </div>
            <div className='col one'></div>
          </div>

        </div>
      </div>
    );
  }
}

module.exports = Progress;

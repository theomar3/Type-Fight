var React = require('react');

class Fight extends React.Component {
  constructor() {
    super();

    this.state = {
      text: 'Click to begin!'
    }
  }

  _clickFightTitle() {

  }



  render() {

    return (
      <div>
        <h1 className='website-title'>Type Fight</h1>
        <h3 className='tagline'> A fun and interactive way to learn how to type faster</h3>

        <div className="fight-screen">
          <p className='fight-title' onClick={() => this._clickFightTitle()}>
            {this.state.text}
          </p>
          //after clicking, Type Fight will show
        //  <p className='fight-title'> Type Fight! </p>
        //  Result of fight will be shown here too
        // <p className='fight-title'> You're a typing beast! </p>
        </div>
      </div>
    );
  }
}

module.exports = Fight;

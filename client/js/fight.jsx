import React from 'react';
import store from './fight-store.js';

class Fight extends React.Component {
  constructor() {
    super();

    this.state = store.copyState();

    store.addListener( state => {
      this.setState(state);
    })
  }

  _clickFightTitle() {
    store.actions.startFight();
  }

  _dodgeAttack(evt) {
    store.actions.dodge(evt);
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
          <img className="player-sprite" src="./images/bradley.gif" />
          <div className="player-stats-and-moves">
            <p className="playerHP">
              HP:{this.state.playerHP}
            </p>
            {/*<input type="text" value="What's your move?" /> */}
            Enter Dodge: <input onKeyUp={evt => this._dodgeAttack(evt)} />
          </div>


          <img className='cpu-sprite' src="./images/sasuke.gif" />
          <div className="cpu-bubble">
            <p>{this.state.cpuAttack} </p>
            <p>{this.state.dodgeString}</p>
          </div>


        </div>
      </div>
    );
  }
}

module.exports = Fight;

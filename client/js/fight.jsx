import React from 'react';
import store from './fight-store.js';



class Fight extends React.Component {
  constructor() {
    super();
    store.actions.load();
    
    this.state = store.copyState();

    store.addListener( state => {
      this.setState(state);
    })
  }

  _clickFightTitle() {
    store.actions.startFight();
  }


  _playerAttack(evt) {
    store.actions.attack(evt);
  }





  render() {
    return (
      <div>
       <audio id="mainTheme" src="./music/FF-main-theme.mp3" loop autoPlay="true"/>
       <audio id="battleTheme"  src="./music/Mortal-Kombat-theme.mp3" />
       <audio id="gameOver" src="./music/game-over-man.mp3" />
       <audio id='victory' src='./music/victory.mp3' />
       <audio id="bradleyHeal" src='./music/bradley-heal.mp3' />
       <audio id="missTaunt" src="./music/miss-taunt.mp3" />
       <audio id='playerHit' src="./music/player-hit.mp3" />
       <audio id='cpuHit' src="./music/cpu-hit.mp3" />
       <audio id="warning" src="./music/warning.mp3" />
       <audio id='danger' src='./music/danger.mp3' />

        <h1 className='website-title'>Type Fight</h1>
        <h3 className='tagline'> A fun and interactive way to learn how to type faster</h3>

        <h2 className="whose-character-player"> You </h2>
        <h2 className="whose-character-cpu"> CPU </h2>
        <div className="fight-screen">
          <p className='fight-title' onClick={() => this._clickFightTitle()}>
            {this.state.text}
          </p>
          <img className="player-sprite" src="./images/bradley.gif" />
          <div className='player-bubble'>
             {this.state.playerAttack}
           </div>
          <div className="player-stats-and-moves">
            <p className="playerHP">
              HP:{this.state.playerHP}
            </p>
            Enter Attack or Heal: <input className='attack-input' onKeyUp={evt => this._playerAttack(evt)} />
          </div>



          <img className='cpu-sprite' src="./images/sasuke.gif" />
          <div className="miss-bubble">
            <p>{this.state.cpuTaunt}</p>
          </div>
          <div className="cpu-bubble">
            <p>{this.state.cpuAttack} </p>
            <p>{this.state.healString}</p>
          </div>
          <div className="cpu-stats-and-moves">
            <p>HP:{this.state.cpuHP}</p>
          </div>

          <div className='move-list'>
            <p className='move-list-title'> Move List </p>
            <ul className="move-list-items">
              <li>LightSlash</li>
              <li>TripStab</li>
              <li>UpCut</li>
            </ul>
          </div>

        </div>
      </div>
    );
  }
}

module.exports = Fight;

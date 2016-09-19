import React from 'react';
import store from './fight-store.js';
import audioFiles from './audio-play.js';




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
          {/*background audio*/}
        <audio id='mainTheme' src="./music/cowboy-bebop.mp3" muted autoPlay  />
        <audio id='MKTheme' src="./music/MK-theme.mp3" />
        <audio id='GuileTheme' src='./music/Guile-theme.mp3' />
        <audio id='FF7BossTheme' src='./music/FF7-boss-theme.mp3' />

          {/*game over audio*/}

        <audio id="gameOver" src="./music/game-over-man.mp3" />
        <audio id='dna' src="./music/dna.mp3" />
        <audio id='kneel' src='./music/kneel.mp3' />
        <audio id='victory' src='./music/victory.mp3' />

          {/*hit audio*/}

        <audio id='playerHit' src="./music/player-hit.mp3" />
        <audio id='cpuHit' src="./music/cpu-hit.mp3" />
        <audio id='warning' src="./music/warning.mp3" />
        <audio id='danger' src='./music/danger.mp3' />

          {/*heal audio*/}

        <audio id = 'gokuHeal' src='./music/goku-heal.mp3' />
        <audio id= 'dendeHeal' src="./music/dende-heal.mp3" />

          {/*cpu attack audio*/}

        <audio id = 'webBall' src="./music/web-ball.mp3" />
        <audio id ='spiderSting' src='./music/spider-sting.mp3' />
        <audio id = 'webSwing' src="./music/web-swing.mp3" />

          {/*player attack audio*/}

        <audio id = 'chargingSlash' src="./music/charging-slash.mp3" />
        <audio id = 'forwardSlash' src="./music/forward-slash.mp3" />
        <audio id = 'upwardSlash' src="./music/upward-slash.mp3" />

          {/*miss audio*/}

        <audio id = 'bradleyTaunt' src="./music/bradley-miss-taunt.mp3" />
        <audio id = 'laughTaunt' src='./music/laugh-miss-taunt.wav' />
        <audio id = 'patheticTaunt' src='./music/pathetic-miss-taunt.wav' />
        <audio id = 'suckTaunt' src='./music/suck-miss-taunt.wav' />




        <h2 className="whose-character-player"> You </h2>
        <h2 className="whose-character-cpu"> CPU </h2>
        <div className="fight-screen">
          <p className='fight-title' onClick={() => this._clickFightTitle()}>
            {this.state.text}
          </p>
          <img className="player-sprite" src={this.state.playerSprite} />
          <div className={this.state.playerBubble}>
             {this.state.playerAttack}
           </div>
          <div className="player-stats-and-moves">
            <p className={this.state.playerStatus}>
              HP:{this.state.playerHP}
            </p>
            Enter Attack or Heal: <input className= {this.state.playerInput} onKeyUp={evt => this._playerAttack(evt)} />
          </div>



          <img className='cpu-sprite' src={this.state.cpuSprite} />
          <div className={this.state.missBubble}>
            <p>{this.state.cpuTaunt}</p>
          </div>
          <div className={this.state.cpuBubble}>
            <p>{this.state.cpuAttack} </p>
            <p>{this.state.healString}</p>
          </div>
          <div className="cpu-stats-and-moves">
            <p className={this.state.cpuStatus}>HP:{this.state.cpuHP}</p>
          </div>

        </div>
        <div className='move-list'>
          <p className='move-list-title'> Move List </p>
          <ul className="move-list-items">
            <li>ForwardS</li>
            <li>ChargeS</li>
            <li>UpwardS</li>
          </ul>
        </div>
      </div>
    );
  }
}

module.exports = Fight;

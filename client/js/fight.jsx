import React from 'react';
import store from './fight-store.js';
import audioFiles from './audio-play.js';
import {Link} from 'react-router';

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

  _cpuDifficulty() {
    store.actions.cpuDifficulty();
}


  render() {
    var input;
    if(this.state.playerInput) {
        input = <input type='text' autoFocus className= 'input-show' onKeyUp={evt => this._playerAttack(evt)} ref={input => this._input = input} />
    }


    return (
      <div className='row'>
        <div className='container col twelve'>
            {/*background audio*/}
          <audio id='mainTheme' src='./music/fallen-angels.mp3' autoPlay muted/>
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


          <div className='row'>
            <div className='col one'></div>
            <div className='col ten'>
               <a href="index.html">
                  <ul className='fight-website-title'  >
                    <li>T</li>
                    <li>y</li>
                    <li>P</li>
                    <li>e</li>
                    <li>F</li>
                    <li>i</li>
                    <li>G</li>
                    <li>h</li>
                    <li>T</li>
                  </ul>
                </a>
            </div>
            <div className='col one'></div>
          </div>

          <div className='row'>
            <div className="fight-screen col twelve">

              <div className='row'>
                <div className='col two'></div>
                <div className='col two'>
                  <h2 className="whose-character-player">
                     You
                  </h2>
                </div>
                <div className='col four'>
                  <p className='fight-title' onClick={() => this._clickFightTitle()}>
                      {this.state.text}
                  </p>
                </div>
                <div className='col three'>
                  <h2 className="whose-character-cpu">
                     CPU
                  </h2>
                  <form>
                    <select id='difficulty' name='cpuDifficulty' onChange={() => this._cpuDifficulty()}>
                      <option value ='void'>- Select CPU Difficulty - </option>
                      <option value='E' >{this.state.cpuEasy}</option>
                      <option value='M'>{this.state.cpuMedium}</option>
                      <option value='H'>{this.state.cpuHard}</option>
                    </select>
                  </form>
                </div>
                <div className='col one'></div>
              </div>

              <div className='row'>
                <div className='col two'></div>
                <div className = 'col two'>

                </div>
              </div>

            </div>
          </div>




        </div>
      </div>




    );
  }
}

module.exports = Fight;

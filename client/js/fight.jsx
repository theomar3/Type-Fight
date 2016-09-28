import React from 'react';
import store from './fight-store.js';

import audioFiles from './audio-play.js';
import MoveList from './move-list.jsx';
import AudioFiles from './audio-files.jsx';
import TypeFightTitle from './type-fight-title.jsx';
import CpuDifficulty from './cpu-difficulty.jsx';
import {Link} from 'react-router';
import swal from 'sweetalert';
console.log(swal);

class Fight extends React.Component {
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



  _clickFightTitle() {
    store.actions.startFight();
  }


  _playerAttack(evt) {
    store.actions.attack(evt);
  }




  render() {
    var input;
    if(this.state.showPlayerInput) {
        input = <input type='text' autoFocus className= 'input-show' onKeyUp={evt => this._playerAttack(evt)} ref={input => this._input = input} />
    }

    var progressLink;
    if(this.state.showClickForProgress !== '') {
      progressLink = <Link className='link-text' to={'/progress'}>             <p>{this.state.showClickForProgress}</p>
      </Link>
    }

    var rematch;
    if(this.state.showRematch) {
      rematch = <p className='rematch' onClick={() => this._clickFightTitle()}>
           Rematch
        </p>
    }

    var showPlayerBubble;
    if(this.state.showPlayerBubble) {
      showPlayerBubble =<div className='player-bubble-show'>{this.state.playerAttackMessage}</div>
    }

    var showCpuBubble;
    if(this.state.showCpuBubble) {
      showCpuBubble = <div className='cpu-bubble-show'>
          <p>{this.state.cpuAttackMessage} </p>
          <p>{this.state.healString}</p>
        </div>
    }

    var showMissBubble;
    if(this.state.showMissBubble) {
      showMissBubble = <div className={this.state.showMissBubble}>
              <p>{this.state.cpuTauntMessage}</p>
          </div>
    }


    return (
      <div className='row'>
        <div className='container col twelve'>
          <AudioFiles />


          <div className='row'>
            <div className='col one'></div>
            <div className='col ten'>
               <TypeFightTitle />
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
                      {this.state.fightScreenTitleText}
                  </p>
                {progressLink}
                {rematch}
                </div>
                <div className='col three'>
                  <h2 className="whose-character-cpu">
                     CPU
                  </h2>
                <CpuDifficulty />
                </div>
                <div className='col one'></div>
              </div>

              <div className='row'>
                <div className='col two'>
                {showPlayerBubble}
                </div>
                <div className = 'col two'>
                  <img className="player-sprite" src={this.state.playerSpriteUrls} />
                </div>
                <div className = 'col four'>
                {showCpuBubble}
                </div>
                <div className = 'col two'>
                  <img className='cpu-sprite' src={this.state.cpuSpriteUrls} />
                </div>
                <div className = 'col two'>
                  {showMissBubble}
                </div>
              </div>

              <div className = 'row'>
                <div className = 'col two'></div>
                <div className = 'col two'>
                  <p className={this.state.playerStatusClass}>
                    HP:{this.state.playerHP}
                  </p>
                </div>
                <div className='col four'>
                  <p className='input-instructions'> Enter Attack or Heal: {input}</p>
                </div>
                <div className = 'col two'>
                  <p className={this.state.cpuStatusClass}>
                    HP:{this.state.cpuHP}
                  </p>
                </div>
                <div className = 'col two'></div>
              </div>

              <MoveList />

            </div>

          </div>

        </div>

      </div>




    );
  }
}

module.exports = Fight;

import React from 'react';
import store from './fight-store.js';
import audioFiles from './audio-play.js';
import MoveList from './move-list.jsx';
import AudioFiles from './audio-files.jsx';
import TypeFightTitle from './type-fight-title.jsx';
import CpuDifficulty from './cpu-difficulty.jsx';
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




  render() {
    var input;
    if(this.state.playerInput) {
        input = <input type='text' autoFocus className= 'input-show' onKeyUp={evt => this._playerAttack(evt)} ref={input => this._input = input} />
    }

    var progressLink;
    if(this.state.clickForProgress !== '') {
      progressLink = <Link className='link-text' to={'/progress'}>             <p>{this.state.clickForProgress}</p>
      </Link>
    }

    var rematch;
    if(this.state.rematch) {
      rematch = <p className='rematch' onClick={() => this._clickFightTitle()}>
           Rematch
        </p>
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
                      {this.state.text}
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
                  <div className={this.state.playerBubble}>
                       {this.state.playerAttack}
                  </div>
                </div>
                <div className = 'col two'>
                  <img className="player-sprite" src={this.state.playerSprite} />
                </div>
                <div className = 'col four'>
                  <div className={this.state.cpuBubble}>
                    <p>{this.state.cpuAttack} </p>
                    <p>{this.state.healString}</p>
                  </div>
                </div>
                <div className = 'col two'>
                  <img className='cpu-sprite' src={this.state.cpuSprite} />
                </div>
                <div className = 'col two'>
                  <div className={this.state.missBubble}>
                      <p>{this.state.cpuTaunt}</p>
                  </div>
                </div>
              </div>

              <div className = 'row'>
                <div className = 'col two'></div>
                <div className = 'col two'>
                  <p className={this.state.playerStatus}>
                    HP:{this.state.playerHP}
                  </p>
                </div>
                <div className='col four'>
                  <p className='input-instructions'> Enter Attack or Heal: {input}</p>
                </div>
                <div className = 'col two'>
                  <p className={this.state.cpuStatus}>
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

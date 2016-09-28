import React from 'react';
import store from './fight-store.js';

class CpuDifficulty extends React.Component {

  _cpuDifficulty() {
    store.actions.cpuDifficulty();
}

  render() {

    return(
      <form>
        <select id='difficulty' name='cpuDifficulty' onChange={() => this._cpuDifficulty()}>
          <option value ='void'>- Select CPU Difficulty - </option>
          <option value ='Baby'>Baby-Mode (Very Easy)</option>
          <option value='Cake Walk' >Piece Of Cake (Easy)</option>
          <option value='Not Rough'>Not Too Rough (Medium)</option>
          <option value="Let's Rock">Let's Rock (Very Medium)</option>
          <option value="Damn I'm Good">Damn I'm Good (Hard)</option>
          <option value="Nightmare">Nightmare (Very Hard)</option>
          <option value="Mike Tyson">Mike Tyson from Punch Out (Extreme) </option>
        </select>
      </form>
    );
  }
}

module.exports = CpuDifficulty;

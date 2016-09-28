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
          <option value ='Very Easy'>Baby-Mode (Very Easy)</option>
          <option value='Easy' >Piece Of Cake (Easy)</option>
          <option value='Medium'>Not Too Rough (Medium)</option>
          <option value='Very Medium'>Let's Rock (Very Medium)</option>
          <option value='Hard'>Damn I'm Good (Hard)</option>
          <option value="Very Hard">Nightmare (Very Hard)</option>
          <option value="Extreme">Mike Tyson from Punch Out (Extreme) </option>
        </select>
      </form>
    );
  }
}

module.exports = CpuDifficulty;

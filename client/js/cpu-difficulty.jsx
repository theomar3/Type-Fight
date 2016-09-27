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
          <option value='Easy' >Easy</option>
          <option value='Medium'>Medium</option>
          <option value='Hard'>Hard</option>
        </select>
      </form>
    );
  }
}

module.exports = CpuDifficulty;

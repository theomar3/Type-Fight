import React from 'react';

class MoveList extends React.Component {


  render() {

    return(
      <div className = 'row'>
        <div className = 'col four'></div>
        <div className='col four'>
          <p className='move-list-title'> Move List </p>
          <ul className="move-list-items">
            <li>ForwardS</li>
            <li>ChargeS</li>
            <li>UpwardS</li>
          </ul>
        </div>
        <div className = 'col four'></div>
      </div>
    );
  }
}

module.exports = MoveList;

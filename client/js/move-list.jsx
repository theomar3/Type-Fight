import React from 'react';

class MoveList extends React.Component {


  render() {

    return(
      <div className = 'row'>
        <div className = 'col three'></div>
        <div className='col six'>
            <p className = 'move-list-title heal-instructions'>TYPE THE RANDOM LETTERS UNDER THE CPU'S ATTACK TO HEAL YOURSELF!</p>
          <p className='move-list-title'> Move List </p>
          <ul className="move-list-items">
            <li>ForwardS</li>
            <li>ChargeS</li>
            <li>UpwardS</li>
          </ul>
        </div>
        <div className = 'col three'></div>
      </div>
    );
  }
}

module.exports = MoveList;

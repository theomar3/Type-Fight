var React = require('react');

class CharacterSelect extends React.Component {


  render() {
    return (
      <div>
        <h1 className='website-title character-select-title'>Character Select</h1>
        <h3 className='tagline'> Choose your hero!</h3>

        //might be a carousel of characters?
        <div className="character-select">
          <div className="player-select">
            <h2 className="whose-character"> You </h2>
            <img className="sample-sprite" src="./images/sample-buu.png" />
            <p className="character-name"> Buu </p>
            <p className='move-list-title'> Move List </p>
            <ul className="move-list">
              <li><span className="attack-command">Kmha</span> - Kamehameha attack</li>
              <li><span className="attack-command">Chcl</span> - Chocolate beam</li>
              <li><span className="attack-command">Regn</span> - Regenerating hp</li>
            </ul>
          </div>

          <div className="cpu-select">
            <h2 className="whose-character"> CPU </h2>
            <img  className= 'sample-sprite' src="./images/sample-goku.png" />
            <p className="character-name"> Son Goku </p>
              <p className='move-list-title'> CPU Difficulty </p>
              <form className="cpu-difficulty-form">
                <input type="radio" /> Easy <br />
                <input type="radio" /> Medium <br />
                <input type="radio" /> Hard
              </form>
          </div>
        </div>
      </div>

    );
  }
}

module.exports = CharacterSelect;

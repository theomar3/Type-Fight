var React = require('react');
class Header extends React.Component {

  constructor() {
    super();

  }

  render () {

    return (
      <header>
        <ul  className='fly-in-text hidden website-title'  >
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

        <div className = 'kapowDiv'>
          <img className='kapow1 hide-image fade-in-image' src='./images/kapow1.gif' />
          <img className='kapow2 hide-image fade-in-image' src='./images/kapow2.gif' />
        </div>

        <ul className = 'fade  tagline'>
          <li> Type </li>
          <li> faster </li>
          <li> and </li>
          <li> more </li>
          <li> acccurately </li>
          <li> the </li>
          <li> fun </li>
          <li> way </li>
        </ul>

      </header>
    );
  }
}

module.exports = Header;

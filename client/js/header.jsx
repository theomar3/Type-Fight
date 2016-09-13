var React = require('react');

class Header extends React.Component {

  render () {
    return (
      <header>
        <h1 className='website-title'>Type Fight</h1>
        <h3 className='tagline'> A fun and interactive way to learn how to type faster</h3>
      </header>
    );
  }
}

module.exports = Header;

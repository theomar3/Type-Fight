import React from 'react';
import { render } from 'react-dom';

var Fight = require('./js/fight.jsx');

require("./scss/style.scss");

class App extends React.Component {

  render () {
    return (
      <div className='container'>
        <Fight />

      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));

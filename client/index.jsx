import React from 'react';
import { render } from 'react-dom';

import Fight from './js/fight.jsx';

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

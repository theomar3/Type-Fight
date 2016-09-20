import React from 'react';
import { render } from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router';

import Fight from './js/fight.jsx';
import Progress from './js/progress.jsx';

require("./scss/style.scss");

class App extends React.Component {

  render () {
    return (
      <div className='container'>
        <Fight />
        <Link className='link-text' to={'/progress'}> Click to see your Progress!</Link>

        {this.props.children}
      </div>
    );
  }
}

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="progress" component={Progress} />
    </Route>
  </Router>
), document.getElementById('app'));

import React from 'react';
import { render } from 'react-dom';
import {Router, Route, Link, hashHistory, IndexRoute} from 'react-router';

import Fight from './js/jsx/fight.jsx';
import Progress from './js/jsx/progress.jsx';

require("./scss/style.scss");

class App extends React.Component {

  render () {
    return (
      <div>

        {this.props.children}
      </div>
    );
  }
}


render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Fight} />
      <Route path="progress" component={Progress} />
    </Route>
  </Router>
), document.getElementById('app'));

/** eslint verified */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import './assets/main.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  loadHome = () => {
    return (
      <Home
        callbackUser={this.callbackUser}
      />
    );
  }

  render () {
    return (
      <main>
        <Switch>
          <Route exact path="/" render={this.loadHome} />
        </Switch>
      </main>
    );
  }
}

export default App;

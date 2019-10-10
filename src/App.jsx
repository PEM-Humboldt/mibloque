/** eslint verified */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Summary from './Summary';
import './assets/main.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBlock: 'Pruebo',
    };
  }

  loadHome = () => {
    return (
      <Home />
    );
  }

  loadSummary = () => {
    const { activeBlock } = this.state;
    return (
      <Summary 
        activeBlock = {activeBlock}
      />
    );
  }

  render () {
    return (
      <main>
        <Switch>
          <Route exact path="/" render={this.loadHome} />
          <Route exact path="/summary" render={this.loadSummary} />
        </Switch>
      </main>
    );
  }
}

export default App;

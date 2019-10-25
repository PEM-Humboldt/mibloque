/** eslint verified */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Summary from './Summary';
import IndicatorsDash from './IndicatorsDash';
import Indicator from './Indicator';
import './assets/main.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBlock: null,
    };
  }

  setActiveBlock = (value) => {
    this.setState({ activeBlock: value });
  }

  loadHome = () => (<Home setActiveBlock={this.setActiveBlock} />)

  loadIndicatorsDash = () => {
    const { activeBlock } = this.state;
    return (
      <IndicatorsDash
        activeBlock={activeBlock}
      />
    );
  }

  loadIndicator = () => {
    const { activeBlock } = this.state;
    return (
      <Indicator
        activeBlock={activeBlock}
      />
    );
  }

  loadSummary = () => {
    const { activeBlock } = this.state;
    return (
      <Summary
        activeBlock={activeBlock}
      />
    );
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" render={this.loadHome} />
          <Route exact path="/indicatorsDash" render={this.loadIndicatorsDash} />
          <Route exact path="/indicator" render={this.loadIndicator} />
          <Route exact path="/summary" render={this.loadSummary} />
        </Switch>
      </main>
    );
  }
}

export default App;

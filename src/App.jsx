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
      activeArea: null,
    };
  }

  setactiveArea = (value) => {
    this.setState({ activeArea: value });
  }

  loadHome = () => (<Home setactiveArea={this.setactiveArea} />)

  loadIndicatorsDash = () => {
    const { activeArea } = this.state;
    return (
      <IndicatorsDash
        activeArea={activeArea}
      />
    );
  }

  loadIndicator = () => {
    const { activeArea } = this.state;
    return (
      <Indicator
        activeArea={activeArea}
      />
    );
  }

  loadSummary = () => {
    const { activeArea } = this.state;
    return (
      <Summary
        activeArea={activeArea}
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

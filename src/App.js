import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import Routes from './Routes';
import { Header, Body, Footer } from './components/Layout';
import trackGA from './utils/HOC/trackGA';

@withRouter
@trackGA
@inject('dataStore')
@observer
class App extends Component {
  componentDidMount() {
    const { getChainInfo } = this.props.dataStore;

    getChainInfo();

    setInterval(() => {
      getChainInfo();
    }, 3000);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <div id="app">
        <Header />
        <Body>
          <Routes />
        </Body>
        <Footer />
        {process.env.NODE_ENV !== 'production' && <DevTools />}
      </div>
    );
  }
}

export default hot(module)(App);

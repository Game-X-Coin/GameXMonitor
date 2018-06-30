import React, { Component } from 'react';
import { browserHistory as history } from 'react-router';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import Routes from './Routes';
import { Header, Body, Footer } from './components/Layout';

@withRouter
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

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

  render() {
    return (
      <Router history={history}>
        <ScrollToTop>
          <div id="app">
            <Header />
            <Body>
              <Routes />
            </Body>
            <Footer />
            {process.env.NODE_ENV !== 'production' && <DevTools />}
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}

export default hot(module)(App);

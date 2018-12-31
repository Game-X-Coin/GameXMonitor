import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';

import trackGA from './utils/HOC/trackGA';
import { preload } from './utils/preload';

import { images } from './constants';

import Routes from './Routes';
import { Header, Body, Footer, Splash } from './components/Layout';

@withRouter
@trackGA
@inject('dataStore')
@observer
class App extends Component {
  @observable
  initialized = false;

  componentDidMount() {
    this.initialize();
  }

  async initialize() {
    await this.props.dataStore.getChainMeta();

    preload(
      [
        images.jumboTron,
        images.logo_header,
        images.logo_footer,
        ...images.nodes
      ],
      () => {
        this.initialized = true;

        this.request();
      }
    );
  }

  request() {
    setTimeout(async () => {
      await this.props.dataStore.getChainMeta();

      this.request();
    }, 3000);
  }

  render() {
    return (
      <div id="app" className={classNames(!this.initialized && 'initializing')}>
        <Splash className={this.initialized && 'hide'} />
        <Header />
        <Body>
          <Routes />
        </Body>
        <Footer />
      </div>
    );
  }
}

export default hot(module)(App);

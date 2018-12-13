import React, { Component } from 'react';
import { observable, action, runInAction } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { BlockList } from '../views/block';
import {  JumboTron } from '../components/Layout'
import { Page, Header } from '../components/Pages';

import { chainAPI } from '../services/api';

import './WelcomePage.scss'

@inject('dataStore')
@observer
class WelcomePage extends Component {
  @observable lastestBlock;
  @observable blocks = [];

  componentDidMount() {

    setTimeout(() => {
      this.request();
      
    }, 5000);
  }

  @action
  async request() {
    const {
      chain: { head_block_num }
    } = this.props.dataStore;

    let end = head_block_num;
    let start = head_block_num - 20;

    if (this.lastestBlock && this.lastestBlock !== head_block_num) {
      start = this.lastestBlock + 1;
    }

    for (let i = start; i <= end; i++) {
      const block = await chainAPI.getBlock(i);

      runInAction(() => {
        this.blocks = [block, ...this.blocks].slice(0, 20);
        this.lastestBlock = i;
      });
    }
  }

  render() {
    return (
      <div class="welcome">
        <JumboTron />

        <Page>
          <Header>
            Stats
          </Header>

          <div className="stats">

            <div className="stat">
              <p className="label">
                Block Height
              </p>

              <h1 className="value">
                932121
              </h1>
            </div>

            <div className="stat">
              <p className="label">
                Producer
              </p>

              <h1 className="value">
                gxcgamexcoin
              </h1>
            </div>


            <div className="stat">
              <p className="label">
                Total TXs
              </p>

              <h1 className="value">
                213123
              </h1>
            </div>

            <div className="stat">
              <p className="label">
                Total Accounts
              </p>

              <h1 className="value">
                1233
              </h1>
            </div>

          </div>


          <Header>
            Transactions
            <Link className="h6 font-weight-normal" to="/blocks">
              See More >
            </Link>
          </Header>
          <BlockList blocks={this.blocks} />

          <Header>
            Block Producers
          </Header>
          <BlockList blocks={this.blocks} />

        </Page>
      </div>
    );
  }
}

export default WelcomePage;

import React, { Component } from 'react';
import { observable, action, runInAction } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { BlockList } from '../views/block';
import { Header } from '../components/Pages';

import { chainAPI } from '../services/api';

@inject('dataStore')
@observer
class WelcomePage extends Component {
  interval = null;

  @observable lastestBlock;
  @observable blocks = [];

  componentDidMount() {
    this.request();

    this.interval = setInterval(() => {
      this.request();
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
      <div>
        <Header>
          Lastest Blocks
          <Link className="h6 font-weight-normal" to="/blocks">
            View all blocks >
          </Link>
        </Header>
        <BlockList blocks={this.blocks} />
      </div>
    );
  }
}

export default WelcomePage;

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { BlockList } from '../views/block';
import { Header } from '../components/Pages';

@inject('dataStore')
@observer
class WelcomePage extends Component {
  constructor() {
    super();
    this.interval = null;
  }

  componentDidMount() {
    const { getBlocks } = this.props.dataStore;

    getBlocks();

    this.interval = setInterval(() => {
      getBlocks();
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { blocks } = this.props.dataStore;

    return (
      <div>
        <Header>
          Lastest Blocks
          <Link className="h6 font-weight-normal" to="/blocks">
            View all blocks >
          </Link>
        </Header>
        <BlockList blocks={blocks} />
      </div>
    );
  }
}

export default WelcomePage;

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { BlockSingle } from '../../views/block';
import { TxList } from '../../views/tx';
import { EmptyState, Header, Page } from '../../components/Pages';
import LoadingSpinner from '../../components/LoadingSpinner';

@inject('dataStore')
@observer
class BlockPage extends Component {
  componentDidMount() {
    this.request();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.request();
    }
  }

  request() {
    const { getBlock } = this.props.dataStore;
    const { id } = this.props.match.params;

    getBlock(id);
  }

  render() {
    const { block, requests } = this.props.dataStore;
    const { fetching, fetched } = requests.getBlock;

    return (
      <Page>
        {fetching && <LoadingSpinner global />}

        <Header>Block {block.block_num && `#${block.block_num}`}</Header>
        <BlockSingle block={block} />

        <Header>Transactions</Header>
        {fetched && block.transactions.length ? (
          <TxList transactions={block.transactions} />
        ) : (
          <EmptyState>There are no transactions in this block</EmptyState>
        )}
      </Page>
    );
  }
}

export default BlockPage;

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { TxSingle } from '../../views/tx';
import { ActionList } from '../../views/action';
import { Header, EmptyState, Page } from '../../components/Pages';
import LoadingSpinner from '../../components/LoadingSpinner';

@inject('dataStore')
@observer
class TxPage extends Component {
  componentDidMount() {
    const { getTransaction } = this.props.dataStore;
    const { id } = this.props.match.params;

    getTransaction(id);
  }

  render() {
    const { transaction, requests } = this.props.dataStore;
    const { fetching, fetched } = requests.getTransaction;
    const actions = transaction.trx && transaction.trx.trx.actions;

    return (
      <Page>
        {fetching && <LoadingSpinner global />}

        <Header>Transaction Detail</Header>
        <TxSingle transaction={transaction} />

        <Header>Actions</Header>
        {fetched && actions && actions.length ? (
          <ActionList actions={actions} />
        ) : (
          <EmptyState>There are no actions in this transaction</EmptyState>
        )}
      </Page>
    );
  }
}

export default TxPage;

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { AccountSingle } from '../../views/account';
import { ActionList } from '../../views/action';
import { Header, EmptyState } from '../../components/Pages';
import LoadingSpinner from '../../components/LoadingSpinner';

@inject('dataStore')
@observer
class AccountPage extends Component {
  componentDidMount() {
    this.request();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.request();
    }
  }

  request() {
    const { getAccount, getActions } = this.props.dataStore;
    const { id } = this.props.match.params;

    getAccount(id);
    getActions(id);
  }

  render() {
    const { account, actions, requests } = this.props.dataStore;
    const transformedActions = actions.actions
      ? actions.actions.map(action => action.action_trace.act).reverse()
      : [];

    return (
      <div>
        {requests.getAccount.fetching && <LoadingSpinner global />}

        <Header>Account</Header>
        <AccountSingle account={account} />

        <Header>Lastest actions</Header>
        {requests.getActions.fetched && transformedActions.length ? (
          <ActionList actions={transformedActions} />
        ) : (
          <EmptyState>There are no actions in this account</EmptyState>
        )}
      </div>
    );
  }
}

export default AccountPage;

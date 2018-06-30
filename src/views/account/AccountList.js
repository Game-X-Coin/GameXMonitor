import React, { Component } from 'react';

import Table from '../../components/Table';

class AccountList extends Component {
  render() {
    const { accounts } = this.props;

    return (
      <Table
        renderHeader={() => (
          <tr>
            <th>Account</th>
            <th>Balance</th>
            <th>Transaction Count</th>
          </tr>
        )}
        renderBody={() =>
          accounts.map(account => (
            <tr>
              <td>{account.id}</td>
              <td>{account.balance} GXC</td>
              <td>{account.txCount}</td>
            </tr>
          ))
        }
      />
    );
  }
}

export default AccountList;

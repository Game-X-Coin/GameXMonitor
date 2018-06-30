import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Table from '../../components/Table';

class TxList extends Component {
  render() {
    const { transactions } = this.props;

    return (
      <Table
        renderHeader={() => (
          <tr>
            <th>Transaction</th>
            <th>Timestamp</th>
            <th>Number of actions</th>
          </tr>
        )}
        renderBody={() =>
          transactions.map(transaction => {
            const txn = transaction.trx;
            const tx = txn.transaction;

            return (
              <tr key={txn.id}>
                <td>
                  <Link to={`/transactions/${txn.id}`}>{txn.id}</Link>
                </td>
                <td>{tx.expiration}</td>
                <td>{tx.actions.length}</td>
              </tr>
            );
          })
        }
      />
    );
  }
}

export default TxList;

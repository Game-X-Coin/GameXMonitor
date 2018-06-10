import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import Table from '../../components/Table';

@inject('dataStore')
@observer
class TxListPage extends Component {
  componentDidMount() {
    this.props.dataStore.getTransactions();
  }

  render() {
    const { transactions, requests } = this.props.dataStore;

    return (
      <div>
        <div className="container">
          <h4>Transactions</h4>
          <Table
            fetching={requests.getTransactions.fetching}
            renderHeader={() => (
              <tr>
                <th>ID</th>
                <th>Timestamp</th>
                <th>Sender</th>
                <th>Recipent</th>
                <th>Amount</th>
                <th>Fee</th>
              </tr>
            )}
            renderBody={() =>
              transactions.map(tx => (
                <tr>
                  <th>{tx.id}</th>
                  <td>{tx.timestamp}</td>
                  <td>{tx.senderId}</td>
                  <td>{tx.recipientId}</td>
                  <td>{tx.amount} GXC</td>
                  <td>{tx.fee} GXC</td>
                </tr>
              ))
            }
          />
        </div>
      </div>
    );
  }
}

export default TxListPage;

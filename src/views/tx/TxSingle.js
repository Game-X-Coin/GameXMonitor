import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Table from '../../components/Table';

class TxSingle extends Component {
  render() {
    const { transaction } = this.props;
    const tx = transaction.trx;

    return (
      <Table
        vertical
        renderBody={() => (
          <React.Fragment>
            <tr>
              <th>Transaction</th>
              <td>
                <Link to={`/transactions/${transaction.id}`}>
                  {transaction.id}
                </Link>
              </td>
            </tr>
            <tr>
              <th>Ref block</th>
              <td>
                <Link to={`/blocks/${transaction.block_num}`}>
                  {transaction.block_num}
                </Link>
              </td>
            </tr>
            <tr>
              <th>Timestamp</th>
              <td>{transaction.block_time}</td>
            </tr>
            <tr>
              <th>Delay</th>
              <td>{tx && `${tx.trx.delay_sec} second`}</td>
            </tr>
            <tr>
              <th>Number of actions</th>
              <td>{tx && tx.trx.actions.length}</td>
            </tr>
            <tr>
              <th>Usage - CPU</th>
              <td>{tx && tx.receipt.cpu_usage_us}</td>
            </tr>
            <tr>
              <th>Usage - Net</th>
              <td>{tx && tx.receipt.net_usage_words}</td>
            </tr>
          </React.Fragment>
        )}
      />
    );
  }
}

export default TxSingle;

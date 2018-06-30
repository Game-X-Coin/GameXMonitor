import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Table from '../../components/Table';

class BlockList extends Component {
  render() {
    const { blocks } = this.props;

    return (
      <Table
        renderHeader={() => (
          <tr>
            <th>Height</th>
            <th>Timestamp</th>
            <th>Producer</th>
            <th>Number of transactions</th>
            <th>Confirmations</th>
          </tr>
        )}
        renderBody={() =>
          blocks.map(block => (
            <tr key={block.id}>
              <td>
                <Link to={`/blocks/${block.id}`}>{block.block_num}</Link>
              </td>
              <td>{block.timestamp}</td>
              <td>
                <Link to={`/accounts/${block.producer}`}>{block.producer}</Link>
              </td>
              <td>{block.transactions && block.transactions.length}</td>
              <td>{block.confirmed}</td>
            </tr>
          ))
        }
      />
    );
  }
}

export default BlockList;

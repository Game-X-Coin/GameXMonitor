import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Table from '../../components/Table';

dayjs.extend(relativeTime);

class BlockList extends Component {
  render() {
    const { blocks } = this.props;

    return (
      <Table
        renderHeader={() => (
          <tr>
            <th>Height</th>
            <th>Time</th>
            <th>Producer</th>
            <th>Number of transactions</th>
            <th>Confirmations</th>
          </tr>
        )}
        renderBody={() =>
          blocks.map(block => (
            <tr key={block.id}>
              <td>
                <Link to={`/blocks/${block.block_num}`}>{block.block_num}</Link>
              </td>
              <td>{block.timestamp && dayjs(block.timestamp).fromNow()}</td>
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

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import Table from '../../components/Table';

class BlockSingle extends Component {
  render() {
    const { block } = this.props;

    return (
      <Table
        vertical
        renderBody={() => (
          <React.Fragment>
            <tr>
              <th>Height</th>
              <td>{block.block_num}</td>
            </tr>
            <tr>
              <th>Time</th>
              <td>
                {block.timestamp &&
                  dayjs(block.timestamp).format('YYYY/MM/DD hh:mm:ss')}
              </td>
            </tr>
            <tr>
              <th>Number of transactions</th>
              <td>{block.transactions && block.transactions.length}</td>
            </tr>
            <tr>
              <th>Confirmations</th>
              <td>{block.confirmed}</td>
            </tr>
            <tr>
              <th>Hash</th>
              <td>
                <Link to={`/blocks/${block.id}`}>{block.id}</Link>
              </td>
            </tr>
            <tr>
              <th>Previous hash</th>
              <td>
                <Link to={`/blocks/${block.previous}`}>{block.previous}</Link>
              </td>
            </tr>
            <tr>
              <th>Produced by</th>
              <td>
                <Link to={`/accounts/${block.producer}`}>{block.producer}</Link>
              </td>
            </tr>
          </React.Fragment>
        )}
      />
    );
  }
}

export default BlockSingle;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Table from '../../components/Table';

class ActionList extends Component {
  render() {
    const { actions } = this.props;

    return (
      <Table
        renderHeader={() => (
          <tr>
            <th>Name</th>
            <th>Actor</th>
            <th>Account</th>
            <th>Memo</th>
          </tr>
        )}
        renderBody={() =>
          actions.map((action, index) => (
            <tr key={index}>
              <td>{action.name}</td>
              <td>
                <Link to={`/accounts/${action.authorization[0].actor}`}>
                  {action.authorization[0].actor}
                </Link>
              </td>
              <td>
                <Link to={`/accounts/${action.account}`}>{action.account}</Link>
              </td>
              <td>{action.data.memo}</td>
            </tr>
          ))
        }
      />
    );
  }
}

export default ActionList;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import Table from '../../components/Table';

class AccountSingle extends Component {
  render() {
    const { account } = this.props;

    return (
      <Table
        vertical
        renderBody={() => (
          <React.Fragment>
            <tr>
              <th>Account</th>
              <td>
                <Link to={`/accounts/${account.account_name}`}>
                  {account.account_name}
                </Link>
              </td>
            </tr>
            <tr>
              <th>Balance</th>
              <td>{account.balance}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>
                {account.created && dayjs(account.created).format('YYYY/MM/DD')}}
              </td>
            </tr>
          </React.Fragment>
        )}
      />
    );
  }
}

export default AccountSingle;

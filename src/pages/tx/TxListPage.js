import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import qs from 'query-string';

import Pagination from '../../components/Pagination';
import { Header, Page, Time } from '../../components/Pages';
import LoadingSpinner from '../../components/LoadingSpinner';
import Table from '../../components/Table';

import API from '../../services/API';

@observer
class TxListPage extends Component {
  @observable
  fetching = false;

  @observable
  txs = [];

  @observable
  pagination = {};

  componentDidMount() {
    this.request();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.request();
    }
  }

  async request() {
    const { page = 1 } = qs.parse(this.props.location.search);

    this.fetching = true;

    const { result: txs, pagination } = await API.getTransactions(page);

    this.txs = txs;
    this.pagination = pagination;

    this.fetching = false;
  }

  render() {
    const { page = 0, count = 0 } = this.pagination;
    const { history } = this.props;

    return (
      <Page>
        {this.fetching && <LoadingSpinner global />}

        <Header>Transactions</Header>
        <Table
          renderHeader={() => (
            <tr>
              <th width="400">Hash</th>
              <th>Block Height</th>
              <th>Status</th>
              <th>Total Actions</th>
              <th width="200">Date</th>
            </tr>
          )}
          renderBody={() =>
            this.txs.map(
              ({
                _id,
                id,
                block_time,
                block_num,
                receipt: { status } = {},
                action_traces = []
              }) => (
                <tr key={_id}>
                  <td className="text-truncate">
                    <Link to={`/transactions/${id}`}>{id}</Link>
                  </td>
                  <td>
                    <Link to={`/blocks/${block_num}`}>{block_num}</Link>
                  </td>
                  <td>{status}</td>
                  <td>{action_traces.length}</td>
                  <td>
                    <Time>{block_time}</Time>
                  </td>
                </tr>
              )
            )
          }
        />

        <Pagination
          current={page}
          total={count}
          onChange={v => history.push(`/transactions?page=${v}`)}
        />
      </Page>
    );
  }
}

export default TxListPage;

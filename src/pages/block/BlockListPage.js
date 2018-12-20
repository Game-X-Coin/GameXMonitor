import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import qs from 'query-string';

import Pagination from '../../components/Pagination';
import Table from '../../components/Table';
import { Header, Page, Time } from '../../components/Pages';
import LoadingSpinner from '../../components/LoadingSpinner';

import API from '../../services/API';

@observer
class BlockListPage extends Component {
  @observable
  fetching = false;

  @observable
  blocks = [];

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

    const { result: blocks, pagination } = await API.getBlocks(page);

    this.blocks = blocks;
    this.pagination = pagination;

    this.fetching = false;
  }

  render() {
    const { page = 0, count = 0 } = this.pagination;
    const { history } = this.props;

    return (
      <Page>
        {this.fetching && <LoadingSpinner global />}

        <Header>Blocks</Header>
        <Table
          renderHeader={() => (
            <tr>
              <th>Height</th>
              <th>Status</th>
              <th>Producer</th>
              <th>Total TXs</th>
              <th width="200">Date</th>
            </tr>
          )}
          renderBody={() =>
            this.blocks.map(
              ({
                block_id,
                block_num,
                irreversible,
                block: { producer, transactions = [], timestamp } = {}
              }) => (
                <tr key={block_id}>
                  <td>
                    <Link to={`/blocks/${block_num}`}>{block_num}</Link>
                  </td>
                  <td>{irreversible ? 'Irreversible' : 'Pending'}</td>
                  <td>
                    <Link to={`/accounts/${producer}`}>{producer}</Link>
                  </td>
                  <td>{transactions.length}</td>
                  <td>
                    <Time>{timestamp}</Time>
                  </td>
                </tr>
              )
            )
          }
        />

        <Pagination
          current={page}
          total={count}
          onChange={v => history.push(`/blocks?page=${v}`)}
        />
      </Page>
    );
  }
}

export default BlockListPage;

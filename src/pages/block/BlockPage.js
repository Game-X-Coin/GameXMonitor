import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { EmptyState, Header, Page } from '../../components/Pages';
import LoadingSpinner from '../../components/LoadingSpinner';
import Time from '../../components/Pages/Time';
import Table from '../../components/Table';

import API from '../../services/API';

@observer
class BlockPage extends Component {
  @observable
  fetched = false;

  @observable
  block = {};

  componentDidMount() {
    this.request();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.request();
    }
  }

  async request() {
    const { id } = this.props.match.params;

    const { result: block } = await API.getBlock(id);

    this.block = block;
    this.fetched = true;
  }

  render() {
    const { block_id, block_num, irreversible, block = {} } = this.block;
    const {
      producer,
      previous,
      timestamp,
      confirmed,
      transactions = []
    } = block;

    const isGenesis = block_num === 1;

    return (
      <Page>
        {!this.fetched && <LoadingSpinner global />}

        <Header>{isGenesis ? 'Genesis Block' : 'Block'}</Header>

        <Table
          vertical
          renderBody={() => (
            <React.Fragment>
              <tr>
                <th>Height</th>
                <td>{block_num}</td>
              </tr>
              <tr>
                <th>ID</th>
                <td>{block_id}</td>
              </tr>
              <tr>
                <th>Previous</th>
                <td>
                  {!isGenesis && (
                    <Link to={`/blocks/${previous}`}>{previous}</Link>
                  )}
                </td>
              </tr>
              <tr>
                <th>Status</th>
                <td>
                  {this.fetched && (irreversible ? 'Irreversible' : 'Pending')}
                </td>
              </tr>
              <tr>
                <th>Produced by</th>
                <td>
                  <Link to={`/accounts/${producer}`}>{producer}</Link>
                </td>
              </tr>
              <tr>
                <th>Confirmed</th>
                <td>{confirmed}</td>
              </tr>
              <tr>
                <th>Date</th>
                <td>
                  <Time>{timestamp}</Time>
                </td>
              </tr>
            </React.Fragment>
          )}
        />

        <Header>
          Transactions {transactions.length ? `(${transactions.length})` : ''}
        </Header>

        {this.fetched &&
          (transactions.length ? (
            <Table
              renderHeader={() => (
                <tr>
                  <th width="300">ID</th>
                  <th>Status</th>
                  <th>Total Actions</th>
                  <th>Expiration</th>
                </tr>
              )}
              renderBody={() =>
                transactions.map(
                  ({
                    status,
                    trx: {
                      id,
                      transaction: { actions = [], expiration } = {}
                    } = {}
                  }) => (
                    <tr key={id}>
                      <td className="text-truncate">
                        <Link to={`/transactions/${id}`}>{id}</Link>
                      </td>
                      <td>{status}</td>
                      <td>{actions.length}</td>
                      <td>
                        <Time>{expiration}</Time>
                      </td>
                    </tr>
                  )
                )
              }
            />
          ) : (
            <EmptyState>There are no transactions in this block</EmptyState>
          ))}
      </Page>
    );
  }
}

export default BlockPage;

import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { Header, EmptyState, Page, Time } from '../../components/Pages';
import LoadingSpinner from '../../components/LoadingSpinner';
import Table from '../../components/Table';
import JsonView from '../../components/JsonView';

import API from '../../services/API';

@observer
class TxPage extends Component {
  @observable
  fetched = false;

  @observable
  tx = {};

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

    const { result: tx } = await API.getTransaction(id);

    this.tx = tx;
    this.fetched = true;
  }

  render() {
    const {
      id,
      block_num,
      block_time,
      receipt: { status, cpu_usage_us, net_usage_words } = {},
      action_traces = []
    } = this.tx;

    return (
      <Page>
        {!this.fetched && <LoadingSpinner global />}

        <Header>Transaction</Header>
        <Table
          vertical
          renderBody={() => (
            <React.Fragment>
              <tr>
                <th>ID</th>
                <td>{id}</td>
              </tr>
              <tr>
                <th>Block Height</th>
                <td>
                  <Link to={`/blocks/${block_num}`}>{block_num}</Link>
                </td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{status}</td>
              </tr>
              <tr>
                <th>CPU Usage</th>
                <td>{this.fetched && `${cpu_usage_us} μs`}</td>
              </tr>
              <tr>
                <th>Network Usage</th>
                <td>{this.fetched && `${net_usage_words * 8} bytes`}</td>
              </tr>
              <tr>
                <th>Date</th>
                <td>
                  <Time>{block_time}</Time>
                </td>
              </tr>
            </React.Fragment>
          )}
        />

        <Header>
          Actions {action_traces.length ? `(${action_traces.length})` : ''}
        </Header>
        {this.fetched &&
          (action_traces.length ? (
            <Table
              renderHeader={() => (
                <tr>
                  <th>Contract</th>
                  <th>Action</th>
                  <th>Authorization</th>
                  <th width="400">Data</th>
                </tr>
              )}
              renderBody={() =>
                action_traces.map(
                  ({ act: { account, name, authorization = [], data } }, i) => (
                    <tr key={i}>
                      <td>
                        <Link to={`/accounts/${account}`}>{account}</Link>
                      </td>
                      <td>{name}</td>
                      <td>
                        {authorization.map(({ permission, actor }, ai) => (
                          <Link key={ai} to={`/accounts/${actor}`}>
                            {actor}@{permission}
                          </Link>
                        ))}
                      </td>
                      <td className="json-data">
                        <JsonView
                          src={data.constructor === Object ? data : { data }}
                        />
                      </td>
                    </tr>
                  )
                )
              }
            />
          ) : (
            <EmptyState>There are no actions in this transaction</EmptyState>
          ))}
      </Page>
    );
  }
}

export default TxPage;

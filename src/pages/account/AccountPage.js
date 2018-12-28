import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { Header, EmptyState, Page, Time } from '../../components/Pages';
import LoadingSpinner from '../../components/LoadingSpinner';
import Table from '../../components/Table';

import API from '../../services/API';
import Pagination from '../../components/Pagination';

@observer
class AccountPage extends Component {
  @observable
  fetching = false;

  @observable
  fetched = false;

  @observable
  account = {};

  @observable
  actions = [];

  @observable
  pagination = {};

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

    this.fetching = true;

    const [
      { result: account },
      { result: actions, pagination }
    ] = await Promise.all([API.getAccount(id), API.getAccountActions(id)]);

    this.fetched = true;
    this.fetching = false;

    this.account = account;
    this.actions = actions;
    this.pagination = pagination;
  }

  async fetchActions(page) {
    const { id } = this.props.match.params;

    const { result: actions, pagination } = await API.getAccountActions(
      id,
      page
    );

    this.actions = actions;
    this.pagination = pagination;
  }

  render() {
    const {
      account_name,
      cpu_limit: { used: usedCpu, max: maxCpu } = {},
      net_limit: { used: usedNet, max: maxNet } = {},
      refund_request,
      ram_usage: usedRam,
      ram_quota: maxRam,
      permissions = [],
      created
    } = this.account;
    const { count } = this.pagination;

    return (
      <Page>
        {this.fetching && <LoadingSpinner global />}

        <Header>Account</Header>
        <Table
          vertical
          renderBody={() => (
            <React.Fragment>
              <tr>
                <th>Account Name</th>
                <td>{account_name}</td>
              </tr>
              <tr>
                <th>Resources</th>
                <td>
                  {this.fetched && (
                    <Table
                      style={{ marginBottom: 0 }}
                      vertical
                      renderBody={() => (
                        <React.Fragment>
                          <tr>
                            <th>CPU Usage</th>
                            <td>
                              {usedCpu} µs / {maxCpu} µs{' '}
                            </td>
                          </tr>
                          <tr>
                            <th>Network Usage</th>
                            <td>
                              {usedNet} bytes / {maxNet} bytes
                            </td>
                          </tr>
                          <tr>
                            <th>RAM Usage</th>
                            <td>
                              {usedRam} bytes / {maxRam} bytes
                            </td>
                          </tr>
                        </React.Fragment>
                      )}
                    />
                  )}
                </td>
              </tr>
              <tr>
                <th>Permissions</th>
                <td>
                  <Table
                    style={{ marginBottom: 0 }}
                    renderHeader={() => (
                      <tr>
                        <th style={{ width: 80 }}>Permission</th>
                        <th>Key</th>
                      </tr>
                    )}
                    renderBody={() =>
                      permissions.map(
                        ({ perm_name, required_auth: { keys = [] } = {} }) => (
                          <tr key={perm_name}>
                            <td>{perm_name}</td>
                            <td>{keys.map(({ key }) => key)}</td>
                          </tr>
                        )
                      )
                    }
                  />
                </td>
              </tr>
              <tr>
                <th>Created At</th>
                <td>
                  <Time>{created}</Time>
                </td>
              </tr>
            </React.Fragment>
          )}
        />

        <Header>Transactions {count ? `(${count})` : ''}</Header>
        {this.fetched &&
          (this.actions.length ? (
            <React.Fragment>
              <Table
                renderHeader={() => (
                  <tr>
                    <th width="100">TX</th>
                    <th>Contract</th>
                    <th>Action</th>
                    <th>Date</th>
                    <th width="500">Data</th>
                  </tr>
                )}
                renderBody={() =>
                  this.actions.map(
                    ({
                      _id,
                      trx_id,
                      createdAt,
                      act: { account, name, data } = {}
                    }) => (
                      <tr key={_id}>
                        <td className="text-truncate">
                          <Link to={`/transactions/${trx_id}`}>{trx_id}</Link>
                        </td>
                        <td>
                          <Link to={`/accounts/${account}`}>{account}</Link>
                        </td>
                        <td>{name}</td>
                        <td>
                          <Time>{createdAt}</Time>
                        </td>
                        <td className="small">{JSON.stringify(data)}</td>
                      </tr>
                    )
                  )
                }
              />
              <Pagination
                {...this.pagination}
                onChange={v => this.fetchActions(v)}
              />
            </React.Fragment>
          ) : (
            <EmptyState>There are no transactions in this account</EmptyState>
          ))}
      </Page>
    );
  }
}

export default AccountPage;

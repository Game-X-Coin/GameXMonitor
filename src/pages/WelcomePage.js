import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { JumboTron } from '../components/Layout';
import { Page, Header } from '../components/Pages';
import JsonView from '../components/JsonView';

import './WelcomePage.scss';
import Table from '../components/Table';
import { producers } from '../constants/producers';

@inject('dataStore')
@observer
class WelcomePage extends Component {
  render() {
    const {
      chainStats: { block_height, producer, total_txs, total_accounts },
      recentActions = []
    } = this.props.dataStore;

    const stats = [
      { label: 'Block Height', value: block_height },
      { label: 'Producer', value: producer },
      { label: 'Total TXs', value: total_txs },
      { label: 'Total Accounts', value: total_accounts }
    ];

    return (
      <div className="welcome">
        <JumboTron />

        <Page>
          <Header>Stats</Header>
          <div className="row stats">
            {stats.map(({ label, value }) => (
              <div className="col-lg-3 col-md-6" key={label}>
                <div className="stat">
                  <p className="label">{label}</p>

                  <h1 className="value">{value}</h1>
                </div>
              </div>
            ))}
          </div>

          <Header>Live Transactions</Header>
          <Table
            renderHeader={() => (
              <tr>
                <th>Block Height</th>
                <th>Contract</th>
                <th>Action</th>
                <th width="200">Authorization</th>
                <th width="400">Data</th>
              </tr>
            )}
            renderBody={() =>
              recentActions.map(
                ({
                  _id,
                  block_num,
                  act: { account, name, authorization = [], data } = {}
                }) => (
                  <tr key={_id}>
                    <td>
                      <Link to={`/blocks/${block_num}`}>{block_num}</Link>
                    </td>
                    <td>
                      <Link to={`/accounts/${account}`}>{account}</Link>
                    </td>
                    <td>{name}</td>
                    <td>
                      {authorization.map(({ permission, actor }) => (
                        <Link key={actor} to={`/accounts/${actor}`}>
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

          <Header>Block Producers</Header>
          <div className="row">
            {producers.map(
              ({ account, nickname, img_logo, img_branding, region }) => {
                const isProducing = producer === account;

                return (
                  <div className="col-lg-6 col-md-6" key={account}>
                    <Link className="producer" to={`/accounts/${account}`}>
                      <div
                        className="branding"
                        style={{
                          backgroundImage: `url(${img_branding})`
                        }}
                      >
                        <img className="logo" src={img_logo} alt={nickname} />
                      </div>
                      <div className="content">
                        <div>
                          <h5 className="nickname">{nickname}</h5>
                          <p className="account text-muted">{region}</p>
                        </div>

                        <div
                          className={classNames(
                            'status',
                            isProducing && 'active'
                          )}
                        >
                          {isProducing ? 'Producing' : 'Idle'}
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              }
            )}
          </div>
        </Page>
      </div>
    );
  }
}

export default WelcomePage;

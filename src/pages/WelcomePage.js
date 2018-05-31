import React, { Component } from 'react';

import { JumboTron } from '../../components/Layout';
import Table from '../../components/Table';

class WelcomePage extends Component {
  render() {
    return (
      <div>
        <JumboTron>Check GXC block and transaction information</JumboTron>
        <div className="container">
          <h4>Lastest Transactions</h4>
          <Table
            fetching={true}
            renderHeader={() => (
              <tr>
                <th>ID</th>
                <th>Timestamp</th>
                <th>Sender</th>
                <th>Recipent</th>
                <th>Amount (GXC)</th>
                <th>Fee (GXC)</th>
              </tr>
            )}
            renderBody={() => (
              <tr>
                <th scope="row">16614400022228999619</th>
                <td>1min ago</td>
                <td>16614400022228999619</td>
                <td>16614400022228999619</td>
                <td>123,123</td>
                <td>0.1</td>
              </tr>
            )}
          />

          <h4>Lastest Blocks</h4>
          <Table
            renderHeader={() => (
              <tr>
                <th>ID</th>
                <th>Timestamp</th>
                <th>Sender</th>
                <th>Recipent</th>
                <th>Amount (GXC)</th>
                <th>Fee (GXC)</th>
              </tr>
            )}
            renderBody={() => (
              <tr>
                <th scope="row">16614400022228999619</th>
                <td>1min ago</td>
                <td>16614400022228999619</td>
                <td>16614400022228999619</td>
                <td>123,123</td>
                <td>0.1</td>
              </tr>
            )}
          />
        </div>
      </div>
    );
  }
}

export default WelcomePage;

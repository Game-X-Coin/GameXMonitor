import React, { Component } from 'react';
import { Form, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import { images } from '../../../constants/images';
import { searchHelper } from '../../../utils/searchHelper';

import './style.scss';

@withRouter
class JumboTron extends Component {
  searchRef = React.createRef();

  async handleSearch(e) {
    e.preventDefault();

    const { value } = this.searchRef.current;

    const routerName = await searchHelper(value);

    this.props.history.push(routerName);
  }

  render() {
    return (
      <div
        className="jumbo-tron"
        style={{
          backgroundImage: `url(${images.jumboTron})`
        }}
      >
        <div className="container">
          <p>Track the history of</p>
          <h1 className="bold">GAME X COIN</h1>

          <div className="search-input">
            <Form onSubmit={e => this.handleSearch(e)}>
              <Input
                innerRef={this.searchRef}
                type="search"
                placeholder="Block, Transaction, Account"
                autoComplete="search"
              />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default JumboTron;

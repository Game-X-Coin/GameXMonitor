import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Label, Form } from 'reactstrap';

import { chainAPI, historyAPI } from '../../../../services/api';

import './style.scss';

@withRouter
class SearchInput extends Component {
  constructor() {
    super();
    this.searchRef = React.createRef();
  }

  async handleSearch(e) {
    e.preventDefault();

    const { value } = this.searchRef.current;

    if (!value.length) {
      return;
    }

    if (Number(value)) {
      this.props.history.push(`/blocks/${value}`);
    } else if (value.length <= 12) {
      this.props.history.push(`/accounts/${value}`);
    } else if (value.length === 64) {
      try {
        await chainAPI.getBlock(value);
        this.props.history.push(`/blocks/${value}`);
      } catch (error) {
        await historyAPI.getTransaction(value);
        this.props.history.push(`/transactions/${value}`);
      }
    }
  }

  render() {
    return (
      <div className="search-input">
        <Form onSubmit={e => this.handleSearch(e)}>
          <Label for="search" hidden>
            search
          </Label>
          <Input
            innerRef={this.searchRef}
            id="search"
            className="field"
            type="search"
            placeholder="Find a GXC transaction, account, block"
            autoComplete="search"
          />
        </Form>
      </div>
    );
  }
}

export default SearchInput;

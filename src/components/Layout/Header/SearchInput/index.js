import React, { Component } from 'react';
import { Input, Label, Form } from 'reactstrap';

import './style.scss';

class SearchInput extends Component {
  constructor() {
    super();
    this.searchRef = React.createRef();
  }

  handleSearch(e) {
    e.preventDefault();

    console.log(this.searchRef.current);
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

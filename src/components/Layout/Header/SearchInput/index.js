import React, { Component } from 'react';
import { Input } from 'reactstrap';

import './style.scss';

class SearchInput extends Component {
  render() {
    return (
      <div className="search-input">
        <Input
          className="field"
          type="search"
          placeholder="Find a GXC transaction, address, block"
          autoComplete="search"
        />
      </div>
    );
  }
}

export default SearchInput;

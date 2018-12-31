import React, { Component } from 'react';
import RNjsonView from 'react-json-view';

export default class JsonView extends Component {
  render() {
    const { src, ...rest } = this.props;

    return (
      <div>
        <RNjsonView
          enableClipboard={false}
          name={false}
          displayDataTypes={false}
          collapsed={1}
          collapseStringsAfterLength={100}
          src={src}
          {...rest}
        />
      </div>
    );
  }
}

import React, { Component } from 'react';
import RNjsonView from 'react-json-view';
import { toJS, isObservableObject } from 'mobx';

export default class JsonView extends Component {
  render() {
    const { src, ...rest } = this.props;

    return (
      <div>
        <RNjsonView
          enableClipboard={false}
          name={false}
          displayDataTypes={false}
          collapsed={2}
          collapseStringsAfterLength={100}
          src={isObservableObject(src) ? toJS(src) : src}
          {...rest}
        />
      </div>
    );
  }
}

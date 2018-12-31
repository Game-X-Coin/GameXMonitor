import React, { Component } from 'react';
import classNames from 'classnames';

import './style.scss';

class Splash extends Component {
  render() {
    return <div className={classNames('splash', this.props.className)} />;
  }
}

export default Splash;

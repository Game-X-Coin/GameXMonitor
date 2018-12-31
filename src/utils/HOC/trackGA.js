import React, { Component } from 'react';
import GA from 'react-ga';

import { GA_ID, NODE_ENV_STATUS } from '../../constants';

GA.initialize(GA_ID, { testMode: NODE_ENV_STATUS.TEST });

const trackGA = WrappedComponent => {
  const trackPage = page => {
    GA.pageview(page.pathname + page.search);
  };

  const HOC = class extends Component {
    componentDidMount() {
      trackPage(this.props.location);
    }

    componentDidUpdate(prevProps) {
      const prevPage = prevProps.location;
      const currentPage = this.props.location;

      if (prevPage !== currentPage) {
        trackPage(currentPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
};

export default trackGA;

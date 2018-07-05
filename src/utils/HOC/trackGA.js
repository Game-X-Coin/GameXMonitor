import React, { Component } from 'react';
import GA from 'react-ga';

import { GA_ID } from '../../constants';

GA.initialize(GA_ID);

const trackGA = (WrappedComponent) => {
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

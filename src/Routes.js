import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes as constantRoutes } from './constants';

class Routes extends Component {
  render() {
    const renderRoutes = routes =>
      routes.map((route, index) => <Route key={index} {...route} />);

    return <Switch>{renderRoutes(constantRoutes)}</Switch>;
  }
}

export default Routes;

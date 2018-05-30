import React, { Component } from 'react';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.mounted = false;

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      this.mounted = true;

      const { default: component } = await importComponent();

      this.mounted &&
        this.setState({
          component: component
        });
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { JumboTron } from '../components/Layout';

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <JumboTron>Not Found :(</JumboTron>
        <div className="container">
          <h2 className="mb-3">
            This is not the web page you are looking for...
          </h2>
          <h4>
            I'll give you a <Link to="/">link</Link> to go back.
          </h4>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <div className="container text-center">
          <h2 className="display-4 my-5">Page not found :(</h2>
          <h5>This is not the web page you are looking for...</h5>
          <h5>
            I'll give you a link to <Link to="/">go back.</Link>
          </h5>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;

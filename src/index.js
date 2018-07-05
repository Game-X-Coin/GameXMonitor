import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory as history } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';

import stores from './stores';

import App from './App';

import 'bootstrap/scss/bootstrap.scss';
import './styles/main.scss';

configure({
  enforceActions: true
});

ReactDOM.render(
  <Provider {...stores}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

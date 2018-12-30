import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { browserHistory as history } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import stores from './stores';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider {...stores}>
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

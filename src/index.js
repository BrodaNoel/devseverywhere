import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import { storage } from 'middlewares';
import * as utils from 'utils';

import App from './App';
import './index.css';

let persistedState = utils.storage.local.get('state');

let store = createStore(
  reducers,
  persistedState || undefined,
  applyMiddleware(storage)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

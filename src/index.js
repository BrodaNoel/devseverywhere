// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from 'reducers';
import middlewares from 'middlewares';
import utils from 'utils';
import * as firebase from 'firebase';

// Import ant styles
import 'antd/lib/notification/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/tooltip/style/css';
import 'antd/lib/progress/style/css';

import App from './App';
import config from './config';
import './index.css';

const storeGeneratedAt = utils.storage.local.get('storeGeneratedAt');
const now = new Date().getTime();
const oneDay = 1000 * 60 * 60 * 24;

// If State was generated more than 24 hours ago, then, restart the state.
let initialState = null;
if (storeGeneratedAt === null || (now - storeGeneratedAt) > oneDay) {
  // Init card array, getting it from the init-config-file
  // and adding data that will be used by the app.
  const cards = config.cards.map(card => {
    return utils.clone({
      data: card,
      tweets: [],
      isDone: false,
      isSelected: false,
      nextMax: null,
      metrics: utils.defaultMetrics
    });
  });

  initialState = { cards };
} else {
  initialState = utils.storage.local.get('state');
}

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk, middlewares.storage)
);

firebase.initializeApp(config.firebase);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

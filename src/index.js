import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from 'reducers';
import { storage } from 'middlewares';
import * as utils from 'utils';

import App from './App';
import { config } from './config';
import './index.css';

let initialState = utils.storage.local.get('state');

// Init card array, getting it from the init-config-file
// and adding data that will be used by the app.
if (initialState === null) {
  let cards = config.cards.map((card) => {
    return Object.assign(
      {},
      {
        data: card,
        tweets: [],
        isDone: false,
        isSelected: false,
        nextMax: null,
        metrics: utils.utils.defaultMetrics
      },
    );
  });

  initialState = { cards };
}

let store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk, storage)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

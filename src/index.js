import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from 'reducers';
import middlewares from 'middlewares';
import utils from 'utils';

// Import ant styles
import 'antd/lib/notification/style/css';

import App from './App';
import config from './config';
import './index.css';

let initialState = utils.storage.local.get('state');

// Init card array, getting it from the init-config-file
// and adding data that will be used by the app.
if (initialState === null) {
  let cards = config.cards.map((card) => {
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
}

let store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk, middlewares.storage)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

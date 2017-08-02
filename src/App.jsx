// @flow
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import CardSelectionPage from 'pages/CardSelectionPage';
import RequestAccessPage from 'pages/RequestAccessPage';
import AnalyticsPage from 'pages/AnalyticsPage';
import withGA from 'HOCs/withGA';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Route
        exact
        path="/"
        component={withGA(CardSelectionPage)} />

      <Route
        exact
        path="/request-access/:tech"
        component={withGA(RequestAccessPage)} />

      <Route
        exact
        path="/:tech" component={withGA(AnalyticsPage)}/>
    </div>
  </BrowserRouter>
);

export default App;

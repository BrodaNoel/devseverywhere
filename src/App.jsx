import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { CardSelectionPage } from 'pages/CardSelectionPage';
import { RequestAccessPage } from 'pages/RequestAccessPage';
import { AnalyticsPage } from 'pages/AnalyticsPage';
import { ErrorList } from 'containers/ErrorList';
import { withGA } from 'HOCs/withGA';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="content">
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

          <div className="others">
            <ErrorList />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

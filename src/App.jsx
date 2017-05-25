import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import cookies from 'js-cookie';

import { CardSelectionPage } from 'pages/CardSelectionPage';
import { RequestAccessPage } from 'pages/RequestAccessPage';
import { AnalyticsPage } from 'pages/AnalyticsPage';
import { ErrorList } from 'containers/ErrorList';
import { withGA } from 'HOCs/withGA';

import * as actions from 'actions';
import { config } from 'config';

// Firebase data
window.credentials = cookies.getJSON('credentials') || null;
window.selectedCard = null;

class App extends Component {
  constructor(props) {
    super(props);

    // Init card array, getting it from the init-config-file.
    // To it just if the user never was logged in the app
    if (props.cards.length === 0) {
      let cards = config.cards;

      cards.forEach((card) => {
        card.tweets = [];
        card.isDone = false;
        card.nextMax = null;
      });

      props.dispatch(
        actions.addCards(cards)
      );
    }
  }

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

App = connect(
  (state) => ({cards: state.cards})
)(App);

export default App;

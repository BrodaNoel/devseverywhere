import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import cookies from 'js-cookie';

import { CardSelectionPage } from 'pages/CardSelectionPage';
import { RequestAccessPage } from 'pages/RequestAccessPage';
import { AnalyticsPage } from 'pages/AnalyticsPage';
import { ErrorMessage } from 'components/ErrorMessage';
import { withGA } from 'HOCs/withGA';

import { config } from 'config';

// TODO: These globals vars will be removed after implementing Redux. Sorry!
window.cards = config.cards;

// Firebase data
window.credentials = cookies.getJSON('credentials') || null;
window.isLoggedInTwitter = window.credentials !== null;
window.user = null;
window.selectedCard = null;

class App extends Component {
  state = {
    errors: []
  };

  constructor(props) {
    super(props);

    // Init
    window.cards.forEach((card) => {
      card.tweets = [];
      card.isDone = false;
      card.nextMax = null;
    });

    this.state = {
      errors: []
    };
  }

  onError = (error) => {
    this.setState({
      errors: [error]
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="content">
            <Route exact path="/" component={withGA(CardSelectionPage)} />
            <Route exact path="/request-access/:social/:tech" component={withGA(RequestAccessPage, {onError: this.onError})} />
            <Route exact path="/:tech" component={withGA(AnalyticsPage, {onError: this.onError})}/>
          </div>

          <div className="others">
            { this.state.errors.map((error, index) => <ErrorMessage key={index} error={error} />) }
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

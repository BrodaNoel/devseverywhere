/**
  * More info about GoogleMapReact component:
  * https://github.com/istarkov/google-map-react/blob/master/API.md
  */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardSelection } from 'containers/CardSelection';
import { Metrics } from 'containers/Metrics';

import * as actions from 'actions';
import { backend } from 'services';
import { config } from 'config';
import './styles.css';

class AnalyticsPage extends Component {
  intervalId = 0;

  getAnalyticsData(card) {
    if (!card.isDone) {
      backend.getTweets(
        card,
        {
          key: this.props.user.credentials.accessToken,
          secret: this.props.user.credentials.secret
        },
        this.props.user.firebaseToken
      ).then(data => {
        this.props.dispatch(
          actions.addTweetsToCard(card, data.tweets)
        );

        if (data.isDone) {
          this.props.dispatch(
            actions.setDoneToCard(card, data.isDone)
          );
        }

      }).catch(response => {
        let error;

        if (response.error.code === 'auth/argument-error') {
          error = 'Sorry, you have to login again';
          this.props.history.push(`/request-access/${this.props.match.params.tech}`);

        } else if (typeof response.error.message !== 'undefined') {
          error = `Unexpected error: ${response.error.message}`;

        } else if (typeof response.error.body !== 'undefined') {
          error = `Backend error: ${response.error.body}`;

        } else {
          error = 'WTF? Absolutely unknown error. But, in my computer is working 🤷';
        }

        this.props.dispatch(
          actions.addError(error)
        );
      });
    }
  }

  componentDidMount() {
    if (!this.props.user.isLogged) {
      this.props.history.push(`/request-access/${this.props.selectedCard.name}`);
    } else {
      this.getAnalyticsData(this.props.selectedCard);

      this.intervalId = setInterval(() => {
        this.getAnalyticsData(this.props.selectedCard)
      }, config.searchTweetsEvery);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.intervalId);
  }

  render() {
    return (
      <div className="AnalyticsPage">
        <a
          className="gitHubIcon"
          href="https://github.com/BrodaNoel/devseverywhere"
          target="_blank"
          rel="noopener noreferrer">Fork me</a>

        <div className="cardSelectionWrapper">
          <CardSelection />
        </div>

        <div className="metricsWrapper">
          <Metrics />
        </div>
      </div>
    );
  }
};

AnalyticsPage = connect(
  (state) => ({
    user: state.user,
    selectedCard: state.selectedCard
  }),
  null
)(AnalyticsPage);

export { AnalyticsPage };

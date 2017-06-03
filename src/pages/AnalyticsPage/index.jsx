/**
  * More info about GoogleMapReact component:
  * https://github.com/istarkov/google-map-react/blob/master/API.md
  */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import CardSelection from 'containers/CardSelection';
import Metrics from 'containers/Metrics';

import * as actions from 'actions';
import selectors from 'selectors';
import config from 'config';
import './styles.css';

class AnalyticsPage extends Component {
  intervalId = 0;

  getAnalyticsData(cardName) {
    this.props.dispatch(
      actions.getMoreTweets(
        cardName,
        this.props.user,
        this.props.history,
        this.props.match.params.tech
      )
    );
  }

  // This function will be called when we are absolutelly sure that we
  // have to start looking for some new tweets.
  // This is not the pain point. The pain point is how to be sure when call it.
  // This function will clear the prev interval, look for tweets and set a
  // interval to keep looking for tweets.
  startGettingData(props) {
    if (props.selectedCardName !== null) {
      clearInterval(this.intervalId);

      this.getAnalyticsData(props.selectedCardName);
      this.intervalId = setInterval(() => this.getAnalyticsData(props.selectedCardName), config.searchTweetsEvery);
    }
  }

  // This function is callen ONLY when... Read `shouldComponentUpdate` description.
  // When this function is executed, means that we changed an important information
  // about out card, so, we should re-render the page.
  componentWillUpdate(newProps) {
    this.startGettingData(newProps);
  }

  componentDidMount() {
    if (!this.props.user.isLogged) {
      this.props.history.push(`/request-access/${this.props.match.params.tech}`);
    } else {
      // If selectedCardName is null, it's because we just arrived here. So, let's change the card.
      // If `this.props.selectedCardName !== this.props.match.params.tech` is true, means
      // that we had the `xxx` card selected, but now, the URL say `yyy`. This scenario happens
      // when you are seeing `.com/React`, then you close the page, and open the url `.com/Vue`
      // IF NOT (the ELSE), it means you just refreshed the page. Because you have a selectedCardName
      // and the selectedCardName is the same as the card we have in the URL.
      if (this.props.selectedCardName === null || this.props.selectedCardName !== this.props.match.params.tech) {
        this.props.dispatch(
          actions.changeSelectedCard(this.props.match.params.tech)
        );
      } else {
        this.startGettingData(this.props);
      }
    }
  }

  // The component should me updated again when:
  // 1. We didn't have a selectedCardName AND NOW WE HAVE! (the user just came here), or,
  // 2. We had a selectedCardName, but now we have another one (someone changed the card)
  shouldComponentUpdate(nextProps) {
    const fromNullToSomething = this.props.selectedCardName === null && nextProps.selectedCardName !== null;
    const changingCard = nextProps.selectedCardName !== this.props.selectedCardName;

    return fromNullToSomething || changingCard;
  }

  // This function will be called when the user CLICK on a card, in this page. Why?
  // because the component was mounted, and it's just changing the props.
  // So, let's change the card!
  componentWillReceiveProps(nextProps) {
    this.props.dispatch(
      actions.changeSelectedCard(nextProps.match.params.tech)
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <DocumentTitle title={`${this.props.selectedCardName} | ${config.pageTitle}`}>
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
            { this.props.selectedCardName !== null && <Metrics /> }
          </div>
        </div>
      </DocumentTitle>
    );
  }
};

AnalyticsPage = connect(
  (state) => ({
    user: state.user,
    selectedCardName: selectors.selectedCardName(state)
  }),
  null
)(AnalyticsPage);

export default AnalyticsPage;

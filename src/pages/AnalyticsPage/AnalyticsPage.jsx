/**
  * More info about GoogleMapReact component:
  * https://github.com/istarkov/google-map-react/blob/master/API.md
  */
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { VictoryChart, VictoryLegend, VictoryTheme, VictoryLine } from 'victory';
import cookies from 'js-cookie';

import { IconMap } from 'components/IconMap';
import { CardSelection } from 'components/CardSelection';

import { backend } from 'services';
import { utils } from 'utils';
import { config } from 'config';
import './styles.css';

export class AnalyticsPage extends Component {
  static defaultProps = {
    center: { lat: 10, lng: -35 },
    zoom: 0
  };

  intervalId = 0;

  constructor(props) {
    super(props);

    this.changeSelectedCard(props.match.params.tech);

    this.state = {
      showMap: false,
      analytics: {
        hours: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        favorites: [0,0,0,0,0,0,0,0,0,0],
        retweets: [0,0,0,0,0,0,0,0,0,0],
        users: {
          verified: 0,
          verifiedRate: 0
        },
        tweetsWithGeoRate: 0,
        tweetsWithGeo: [],
        tweetsCount: 0,
        map: {
          points: []
        }
      }
    };
  }

  onCardClick = (card) => {
    if (!window.isLoggedInTwitter) {
      this.props.history.push(`/request-access/twitter/${card.name}`);
    } else {
      this.props.history.push(`/${card.name}`);
    }
  }

  calculateAnalytics() {
    var data = {
      hours: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      favorites: [0,0,0,0,0,0,0,0,0,0],
      retweets: [0,0,0,0,0,0,0,0,0,0],
      users: {
        verified: 0,
        verifiedRate: 0
      },
      tweetsWithGeo: [],
      tweetsWithGeoRate: 0,
      map: {
        points: []
      }
    };

    window.selectedCard.tweets.forEach((tweet) => {
      let hour = new Date(tweet.created_at).getUTCHours();
      data.hours[hour]++;

      if (+tweet.favorite_count < 10) {
        data.favorites[+tweet.favorite_count]++;
      }

      if (+tweet.retweet_count < 10) {
        data.retweets[+tweet.retweet_count]++;
      }

      if (tweet.user.verified) {
        data.users.verified++;
      }

      if (tweet.coordinates || tweet.place) {
        data.tweetsWithGeo.push(tweet);
        data.map.points.push(
          utils.getMapPoint(tweet.place.bounding_box.coordinates[0])
        );
      }
    });

    // Calculate rates
    data.users.verifiedRate = utils.truncate(data.users.verified / window.selectedCard.tweets.length * 100, 2);
    data.tweetsWithGeoRate = utils.truncate(data.tweetsWithGeo.length / window.selectedCard.tweets.length * 100, 2);

    data.tweetsCount = window.selectedCard.tweets.length;

    this.setState({
      analytics: data,
      showMap: data.map.points.length > 0
    });
  }

  getAnalyticsData(card) {
    if (!card.isDone) {
      backend.getTweets(
        card,
        {
          key: window.credentials.accessToken,
          secret: window.credentials.secret
        },
        cookies.get('firebaseToken')
      ).then(data => {
        // TODO: Remove it after Redux implementation
        card.tweets = [...card.tweets, ...data.tweets];
        card.isDone = data.isDone;

        // If the card we just get data still selected, let's show its data
        if (card.name === window.selectedCard.name) {
          this.calculateAnalytics();
        }
      }).catch(response => {
        if (response.error.code === 'auth/argument-error') {
          this.props.onError('You have to login again');
          this.props.history.push(`/request-access/twitter/${card.name}`);

        } else if (typeof response.error.message !== 'undefined') {
          this.props.onError(`Unexpected error: ${response.error.message}`);

        } else if (typeof response.error.body !== 'undefined') {
          this.props.onError(`Backend error: ${response.error.body}`);

        } else {
          this.props.onError('WTF? Absolutely unknown error. But, in my computer is working 🤷');
        }
      });
    }
  }

  changeSelectedCard(cardName) {
    window.selectedCard = window.cards.find(x => x.name === cardName);
  }

  componentDidMount() {
    if (!window.isLoggedInTwitter) {
      this.props.history.push(`/request-access/twitter/${window.selectedCard.name}`);
    } else {
      this.getAnalyticsData(window.selectedCard);
      this.calculateAnalytics();
      this.intervalId = setInterval(() => {this.getAnalyticsData(window.selectedCard)}, 10000);
    }
  }

  componentWillReceiveProps(nextProps) {
    clearTimeout(this.intervalId);
    this.changeSelectedCard(nextProps.match.params.tech);

    this.getAnalyticsData(window.selectedCard);
    this.calculateAnalytics();
    this.intervalId = setInterval(() => {this.getAnalyticsData(window.selectedCard)}, 10000);
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

        <div className="cardSelectionContainer">
          <CardSelection
            cards={window.cards}
            onCardClick={this.onCardClick} />
        </div>

        <div className={ 'analyticsContainer ' + (!this.state.showMap ? 'full' : '') }>
          <div className="row -numbers">
            <div className="cell">
              { this.state.analytics.users.verified } user verified ({ this.state.analytics.users.verifiedRate }%)
            </div>

            <div className="cell" title="We are processing all tweets from last week">
              { this.state.analytics.tweetsCount } tweets were analized<br/>
              { window.selectedCard.isDone ? 'Process finished.' : 'Getting more tweets...' }
            </div>

            <div className="cell">
              { this.state.analytics.tweetsWithGeo.length } tweets with geolocation ({ this.state.analytics.tweetsWithGeoRate }%)
            </div>
          </div>

          <div className="row -graphs">
            <div className="cell">
              <VictoryChart theme={VictoryTheme.material}>
                <VictoryLine
                  data={utils.formatDataToGraph(this.state.analytics.retweets, 'x', 'y')}
                  theme={VictoryTheme.material}/>

                <VictoryLine
                  data={utils.formatDataToGraph(this.state.analytics.favorites, 'x', 'y')}
                  theme={VictoryTheme.material}/>

                <VictoryLegend
                  data={[{ name: 'Retweets' }, { name: 'Favorites' }]}/>
              </VictoryChart>
            </div>

            <div className="cell">
              <VictoryChart theme={VictoryTheme.material}>
                <VictoryLine
                  domain={{
                    x: [0, 24],
                    y: [0, Math.max(...this.state.analytics.hours) * 1.1]
                  }}
                  data={utils.formatDataToGraph(this.state.analytics.hours, 'x', 'y')}
                  theme={VictoryTheme.material}/>

                <VictoryLegend
                  data={[{ name: 'UTC hours' }]}/>
              </VictoryChart>
            </div>
          </div>
        </div>

        {
          this.state.showMap &&
          <div className="mapContainer">
            <GoogleMapReact
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              bootstrapURLKeys={{key: config.googleMaps.apiKey}}>

              {this.state.analytics.map.points.map((point, index) => <IconMap key={index} {...point} />)}
            </GoogleMapReact>
          </div>
        }
      </div>
    );
  }
};

/**
  * More info about GoogleMapReact component:
  * https://github.com/istarkov/google-map-react/blob/master/API.md
  */
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './styles.css';

import { IconMap } from '../../components/IconMap';
import { CardSelection } from '../../components/CardSelection';

import { backend } from '../../services';

export class AnalyticsPage extends Component {
  static defaultProps = {
    center: { lat: 10, lng: -35 },
    zoom: 0
  };

  isDone = false;

  constructor(props) {
    super(props);

    this.state = {
      tech: props.match.params.tech,
      showMap: false,
      analytics: {
        favorites: {},
        retweets: {},
        users: {
          verifiedRate: 0,
          geoEnabledRate: 0
        },
        tweetsWithGeoRate: 0
      }
    };
  }

  onCardClick = (card) => {
    if (!window.isLoggedInTwitter) {
      this.props.history.push(`/request-access/twitter/${card.name}`);
    } else {
      this.props.history.push(`/${card.name}`);
      this.restartAnalytics(card);
      this.showAnalytics();
    }
  }

  restartAnalytics(card) {
    window.tweets = [];
    this.analytics = {};
  }

  calculateAnalytics() {
    var data = {
      hours: {},
      langs: {},
      favorites: {},
      retweets: {},
      users: {
        verified: 0,
        verifiedRate: 0,
        followers: {},
        following: {}
      },
      tweetsWithGeo: [],
      tweetsWithGeoRate: 0
    };

    window.tweets.forEach((tweet) => {
      let hour = new Date(tweet.created_at).getUTCHours();
      data.hours[hour] = data.hours[hour] || 0;
      data.hours[hour]++;

      data.langs[tweet.lang] = data.langs[tweet.lang] || 0;
      data.langs[tweet.lang]++;

      data.favorites[tweet.favorite_count] = data.favorites[tweet.favorite_count] || 0;
      data.favorites[tweet.favorite_count]++;

      data.retweets[tweet.retweet_count] = data.retweets[tweet.retweet_count] || 0;
      data.retweets[tweet.retweet_count]++;

      data.users.followers[tweet.user.followers_count] = data.users.followers[tweet.user.followers_count] || 0;
      data.users.followers[tweet.user.followers_count]++;

      data.users.following[tweet.user.friends_count] = data.users.following[tweet.user.friends_count] || 0;
      data.users.following[tweet.user.friends_count]++;

      if (tweet.user.verified) {
        data.users.verified++;
      }

      if (tweet.coordinates || tweet.place) {
        data.tweetsWithGeo.push(tweet);
      }
    });

    // If "und" (undefined) key is defined, rename it for "unknown".
    if (typeof data.langs.und !== 'undefined') {
      data.langs.unknown = data.langs.und;
      delete data.langs.und;
    }

    // Calculate rates
    data.users.verifiedRate = data.users.verified / window.tweets.length * 100;
    data.tweetsWithGeoRate = data.tweetsWithGeo.length / window.tweets.length * 100;

    this.setState({analytics: data});

    if (!this.isDone) {
      setTimeout(() => {
        this.getAnalyticsData().then(() => {
          this.calculateAnalytics();
        });
      }, 1000 * 10);
    }
  }

  getAnalyticsData() {
    return backend.getTweets('#' + this.state.tech)
      .then(r => {
        // TODO: Remove it after Redux implementation
        window.tweets = [...window.tweets, ...r.tweets];
        this.isDone = r.isDone;
      });
  }

  componentDidMount() {
    if (!window.isLoggedInTwitter) {
      this.props.history.push(`/request-access/twitter/${this.state.tech}`);
    } else {
      if (window.selectedCard === null) {
        window.selectedCard = window.cards.find(x => x.name === this.state.tech);
      }

      window.tweets = [];
      this.getAnalyticsData().then(() => {
        this.calculateAnalytics();
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({tech: nextProps.match.params.tech});
    this.restartAnalytics(window.selectedCard);
  }

  render() {
    return (
      <div className="AnalyticsPage">
        <div className="cardSelectionContainer">
          <CardSelection
            cards={window.cards}
            onCardClick={this.onCardClick} />
        </div>

        <div className={ 'analyticsContainer ' + (!this.state.showMap ? 'full' : '') }>
          <div className="row">
            <div className="cell">{JSON.stringify(this.state.analytics.hours)}<br/>grafico de circulos</div>
            <div className="cell">{JSON.stringify(this.state.analytics.langs)}<br/>graficos de barra horizontales</div>
            <div className="cell">{JSON.stringify(this.state.analytics.favorites)} & {JSON.stringify(this.state.analytics.retweets)}<br/>grafico de lineas verticales (1 para 2)</div>
          </div>

          <div className="row">
            <div className="cell">User verified: { this.state.analytics.users.verifiedRate }%</div>
            <div className="cell">{JSON.stringify(this.state.analytics.users.followers)} & {JSON.stringify(this.state.analytics.users.following)}<br/>grafico de lineas verticales (1 para 2)</div>
            <div className="cell">Tweets with geolocation: { this.state.analytics.tweetsWithGeoRate }%</div>
          </div>
        </div>

        {
          this.state.showMap &&
          <div className="mapContainer">
            <GoogleMapReact
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              bootstrapURLKeys={{key: 'AIzaSyCzNy8leybwmkQbAFEvRCzRIB29YOlN0Ww'}}>
              <IconMap lat={10} lng={-35} />
            </GoogleMapReact>
          </div>
        }
      </div>
    );
  }
};

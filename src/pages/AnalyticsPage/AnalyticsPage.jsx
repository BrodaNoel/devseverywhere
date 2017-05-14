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

/*
 Tweet object example
 {
   coordinates: x.coordinates,
   created_at: x.created_at,
   lang: x.lang,
   place: x.place,
   favorite_count: x.favorite_count,
   retweet_count: x.retweet_count,
   user: {
     verified: x.user.verified,
     geo_enabled: x.user.geo_enabled,
     followers_count: x.user.followers_count,
     friends_count: x.user.friends_count
   }
 }

 */

export class AnalyticsPage extends Component {
  static defaultProps = {
    center: { lat: 10, lng: -35 },
    zoom: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      tech: props.match.params.tech,
      showMap: false,
      analytics: {
        users: {
          verifiedRate: 0,
          geoEnabledRate: 0
        }
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
      users: {
        verified: 0,
        verifiedRate: 0,
        geoEnabled: 0,
        geoEnabledRate: 0
      }
    };

    window.tweets.forEach((tweet) => {
      data.hours[3] = !!data.hours[3] ? data.hours[3] + 1 : 1;
      data.langs[tweet.lang] = !!data.langs[tweet.lang] ? data.langs[tweet.lang] + 1 : 1;

      if (tweet.user.verified) {
        data.users.verified++;
      }

      if (tweet.user.geo_enabled) {
        data.users.geoEnabled++;
      }
    });

    // If "und" (undefined) key is defined, rename it for "unknown".
    if (typeof data.langs.und !== 'undefined') {
      data.langs.unknown = data.langs.und;
      delete data.langs.und;
    }

    // Calculate rates
    data.users.verifiedRate = data.users.verified / window.tweets.length * 100;
    data.users.geoEnabledRate = data.users.geoEnabled / window.tweets.length * 100;

    this.setState({analytics: data});
  }

  getAnalyticsData() {
    return backend.getTweets('#' + this.state.tech)
      .then(r => {
        // TODO: Remove it after Redux implementation
        window.tweets = [...window.tweets, ...r.tweets];
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
            <div className="cell">favorite_count & retweet_count - grafico de lineas verticales (1 para 2)</div>
          </div>

          <div className="row">
            <div className="cell">User verified: { this.state.analytics.users.verifiedRate }%</div>
            <div className="cell">user.followers_count & user.friends_count - grafico de lineas verticales (1 para 2)</div>
            <div className="cell">User with geolocation enabled: { this.state.analytics.users.geoEnabled }%</div>
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

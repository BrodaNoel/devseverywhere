/**
  * More info about GoogleMapReact component:
  * https://github.com/istarkov/google-map-react/blob/master/API.md
  */
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { VictoryChart, VictoryLegend, VictoryTheme, VictoryLine } from 'victory';

import { IconMap } from '../../components/IconMap';
import { CardSelection } from '../../components/CardSelection';

import { backend } from '../../services';
import { utils } from '../../utils';
import './styles.css';

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
        hours: {},
        favorites: [],
        retweets: [],
        users: {
          verifiedRate: 0,
          geoEnabledRate: 0
        },
        tweetsWithGeoRate: 0,
        tweetsCount: 0
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
      favorites: [0,0,0,0,0,0,0,0,0,0],
      retweets: [0,0,0,0,0,0,0,0,0,0],
      users: {
        verified: 0,
        verifiedRate: 0
      },
      tweetsWithGeo: [],
      tweetsWithGeoRate: 0
    };

    window.tweets.forEach((tweet) => {
      let hour = new Date(tweet.created_at).getUTCHours();
      data.hours[hour] = data.hours[hour] || 0;
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
      }
    });

    // Calculate rates
    data.users.verifiedRate = utils.truncate(data.users.verified / window.tweets.length * 100, 2);
    data.tweetsWithGeoRate = utils.truncate(data.tweetsWithGeo.length / window.tweets.length * 100, 2);

    data.tweetsCount = window.tweets.length;

    this.setState({analytics: data});

    if (!this.isDone) {
      setTimeout(() => {
        this.getAnalyticsData().then(() => {
          this.calculateAnalytics();
        });
      }, 1000 * 10);
    }
  }

  formatDataToGraph(data, x, y) {
    return data.map((value, index) => ({[x]: index, [y]: value}));
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
          <div className="row -numbers">
            <div className="cell">User verified: { this.state.analytics.users.verifiedRate }%</div>
            <div className="cell">Tweets analized: { this.state.analytics.tweetsCount }</div>
            <div className="cell">Tweets with geolocation: { this.state.analytics.tweetsWithGeoRate }%</div>
          </div>

          <div className="row -graphs">
            <div className="cell">
              <VictoryChart theme={VictoryTheme.material}>

                <VictoryLine
                  data={this.formatDataToGraph(this.state.analytics.retweets, 'x', 'y')}
                  theme={VictoryTheme.material}/>

                <VictoryLine
                  data={this.formatDataToGraph(this.state.analytics.favorites, 'x', 'y')}
                  theme={VictoryTheme.material}/>

                <VictoryLegend
                  data={[{ name: 'Retweets' }, { name: 'Favorites' }]}/>
              </VictoryChart>
            </div>

            <div className="cell">{
                Object.keys(this.state.analytics.hours).map((hour) => `${hour}hs: ${this.state.analytics.hours[hour]},`)}
                <br/>grafico de circulos
            </div>
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

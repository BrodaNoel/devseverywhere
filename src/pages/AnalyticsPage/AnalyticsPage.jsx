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

  tech = this.props.match.params.tech;
  showMap = false;

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
    this.tech = card.name;
  }

  showAnalytics() {
    backend.getTweets('#' + this.tech)
      .then(r => {
        // TODO: Remove it after Redux implementation
        window.tweets.push(r.tweets);
      });
  }

  componentDidMount() {
    if (!window.isLoggedInTwitter) {
      this.props.history.push(`/request-access/twitter/${this.tech}`);
    } else {
      if (window.selectedCard === null) {
        window.selectedCard = window.cards.find(x => x.name === this.tech);
      }

      this.restartAnalytics(window.selectedCard);
      this.showAnalytics();
    }
  }

  render() {
    return (
      <div className="AnalyticsPage">
        <div className="cardSelectionContainer">
          <CardSelection
            cards={window.cards}
            onCardClick={this.onCardClick} />
        </div>

        <div className={ 'analyticsContainer ' + (!this.showMap ? 'full' : '') }>
          Some data
        </div>

        <div className="mapContainer">
          {
            this.showMap &&
            <GoogleMapReact
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              bootstrapURLKeys={{key: 'AIzaSyCzNy8leybwmkQbAFEvRCzRIB29YOlN0Ww'}}>
              <IconMap lat={10} lng={-35} />
            </GoogleMapReact>
          }
        </div>
      </div>
    );
  }
};

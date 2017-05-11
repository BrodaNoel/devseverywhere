/**
  * More info about GoogleMapReact component:
  * https://github.com/istarkov/google-map-react/blob/master/API.md
  */
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './styles.css';

import { IconMap } from '../../components/IconMap';
import { CardSelection } from '../../components/CardSelection';

export class MapPage extends Component {
  static defaultProps = {
    center: { lat: 10, lng: -35 },
    zoom: 0
  };

  // TODO: Move it to some kind of implementation
  cards = [
    { name: 'ReactJS', hashtags: ['#reactJS', '#react'] },
    { name: 'AngularJS', hashtags: ['#angularjs', '#angular'] },
    { name: 'VueJS', hashtags: ['#vuejs', '#vue'] },
    { name: 'Ember', hashtags: ['#emberjs', '#ember'] }
  ];

  isLoggedInTwitter = false;

  onCardClick = (card) => {
    if (!this.isLoggedInTwitter) {
      this.props.history.push(`/request-access/twitter/${card.name}`);
    } else {
      this.props.history.push(`/${card.name}`);
    }
  }

  render() {
    return (
      <div className="MapPage">
        <div className="cardSelectionContainer">
          <CardSelection
            cards={this.cards}
            onCardClick={this.onCardClick} />
        </div>

        <div className="mapContainer">
          <GoogleMapReact
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            bootstrapURLKeys={{key: 'AIzaSyCzNy8leybwmkQbAFEvRCzRIB29YOlN0Ww'}}>
            <IconMap lat={10} lng={-35} />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
};

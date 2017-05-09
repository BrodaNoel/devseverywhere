/**
  * More info about GoogleMapReact component:
  * https://github.com/istarkov/google-map-react/blob/master/API.md
  */

import React, { Component } from 'react';
import './styles.css';

import GoogleMapReact from 'google-map-react';

const Pepe = (props) => (
  <div
    style={ {color: 'white', backgroundColor: 'black'} }>
    {props.text}
  </div>
);

export class MapPage extends Component {
  static defaultProps = {
    center: {lat: 10, lng: -35},
    zoom: 0
  };

  render() {
    return (
      <div className="MapPage">
        <GoogleMapReact
           defaultCenter={this.props.center}
           defaultZoom={this.props.zoom}
           bootstrapURLKeys={{
            key: 'AIzaSyCzNy8leybwmkQbAFEvRCzRIB29YOlN0Ww'
          }}
         >
           <Pepe
             lat={10}
             lng={-35}
             text={`Map for ${this.props.match.params.tech}`}>
           </Pepe>
         </GoogleMapReact>
      </div>
    );
  }
};

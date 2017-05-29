import React from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { IconMap } from 'components/IconMap';
import { VictoryChart, VictoryLegend, VictoryTheme, VictoryLine } from 'victory';

import { utils } from 'utils';
import { config } from 'config';
import './styles.css';

let Metrics = (props) => (
  <div className="Metrics">
    <div className={ 'analyticsContainer ' + (!props.analytics.showMap ? 'full' : '') }>
      <div className="row -numbers">
        <div className="cell">
          { props.analytics.users.verified } user verified ({ props.analytics.users.verifiedRate }%)
        </div>

        <div className="cell" title="We are processing all tweets from last week">
          { props.analytics.tweetsCount } tweets were analized<br/>
          { props.selectedCard.isDone ? 'Process finished.' : 'Getting more tweets...' }
        </div>

        <div className="cell">
          { props.analytics.tweetsWithGeo.length } tweets with geolocation ({ props.analytics.tweetsWithGeoRate }%)
        </div>
      </div>

      <div className="row -graphs">
        <div className="cell">
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine
              data={utils.formatDataToGraph(props.analytics.retweets, 'x', 'y')}
              theme={VictoryTheme.material}
              standalone={false} />

            <VictoryLine
              data={utils.formatDataToGraph(props.analytics.favorites, 'x', 'y')}
              theme={VictoryTheme.material}
              standalone={false} />

            <VictoryLegend
              data={[{ name: 'Retweets' }, { name: 'Favorites' }]} />
          </VictoryChart>
        </div>

        <div className="cell">
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine
              domain={{
                x: [0, 24],
                y: [0, Math.max(...props.analytics.hours) * 1.1]
              }}
              data={utils.formatDataToGraph(props.analytics.hours, 'x', 'y')}
              theme={VictoryTheme.material}
              standalone={false} />

            <VictoryLegend
              data={[{ name: 'UTC hours' }]}/>
          </VictoryChart>
        </div>
      </div>
    </div>

    {
      props.analytics.showMap &&
      <div className="mapContainer">
        <GoogleMapReact
          defaultCenter={props.center}
          defaultZoom={props.zoom}
          bootstrapURLKeys={{key: config.googleMaps.apiKey}}>

          {props.analytics.map.points.map((point, index) => <IconMap key={index} {...point} />)}
        </GoogleMapReact>
      </div>
    }
  </div>
);
Metrics.defaultProps = {
  center: { lat: 10, lng: -35 },
  zoom: 0
};

Metrics = connect(
  (state) => ({
    analytics: selectors.analytics(state),
    selectedCard: state.selectedCard
  })
)(Metrics);

export { Metrics };

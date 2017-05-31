import React from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import IconMap from 'components/IconMap';
import { VictoryChart, VictoryLegend, VictoryTheme, VictoryLine } from 'victory';

import utils from 'utils';
import selectors from 'selectors';
import config from 'config';
import './styles.css';

let Metrics = props => (
  <div className="Metrics">
    <div className={ 'metricsContainer ' + (!props.metrics.showMap ? 'full' : '') }>
      <div className="row -numbers">
        <div className="cell">
          { props.metrics.users.verified } user verified ({ props.metrics.users.verifiedRate }%)
        </div>

        <div className="cell" title="We are processing all tweets from last week">
          { props.metrics.tweetsCount } tweets were analized<br/>
          { props.selectedCardData.isDone ? 'Process finished.' : 'Getting more tweets...' }
        </div>

        <div className="cell">
          { props.metrics.tweetsWithGeo.length } tweets with geolocation ({ props.metrics.tweetsWithGeoRate }%)
        </div>
      </div>

      <div className="row -graphs">
        <div className="cell">
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine
              data={utils.formatDataToGraph(props.metrics.retweets, 'x', 'y')}
              theme={VictoryTheme.material}
              standalone={false} />

            <VictoryLine
              data={utils.formatDataToGraph(props.metrics.favorites, 'x', 'y')}
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
                y: [0, Math.max(...props.metrics.hours) * 1.1]
              }}
              data={utils.formatDataToGraph(props.metrics.hours, 'x', 'y')}
              theme={VictoryTheme.material}
              standalone={false} />

            <VictoryLegend
              data={[{ name: 'UTC hours' }]}/>
          </VictoryChart>
        </div>
      </div>
    </div>

    {
      props.metrics.showMap &&
      <div className="mapWrapper">
        <GoogleMapReact
          defaultCenter={props.center}
          defaultZoom={props.zoom}
          bootstrapURLKeys={{key: config.googleMaps.apiKey}}>

          {props.metrics.map.points.map((point, index) => <IconMap key={index} {...point} />)}
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
    metrics: selectors.selectedCardMetrics(state),
    selectedCardData: selectors.selectedCardData(state)
  })
)(Metrics);

export default Metrics;

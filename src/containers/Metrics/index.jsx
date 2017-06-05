import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import IconMap from 'components/IconMap';
import { VictoryChart, VictoryLegend, VictoryTheme, VictoryLine } from 'victory';
import Tooltip from 'antd/lib/tooltip';
import Progress from 'antd/lib/progress';

import utils from 'utils';
import selectors from 'selectors';
import config from 'config';
import './styles.css';

class Metrics extends Component {
  static defaultProps = {
    center: { lat: 10, lng: -35 },
    zoom: 0
  };

  intervalId = null;

  constructor(props) {
    super(props);

    this.state = {
      percent: 0
    };

    this.intervalId = setInterval(
      this.changeProgressBar,
      config.searchTweetsEvery / 10 // Change status bar 10 times until complete it.
    );
  }

  changeProgressBar = () => {
    if (this.state.percent < 100) {
      this.setState({
        percent: this.state.percent + 10
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      percent: 0
    });
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <div className="Metrics">
        <div className={ 'metricsContainer ' + (!this.props.metrics.showMap ? 'full' : '') }>
          <div className="row -numbers">
            <div className="cell">
              { this.props.metrics.users.verified } users verified ({ this.props.metrics.users.verifiedRate }%)
            </div>

            <div className="cell -important">
              <div>
                <Tooltip title="Processing all tweets from last week">
                  { this.props.metrics.tweetsCount } tweets were analized
                </Tooltip>
              </div>
              <div className="progress">
                {
                  !this.props.selectedCardData.isDone &&
                  <Progress percent={this.state.percent} strokeWidth={5} showInfo={false} />
                }
              </div>
            </div>

            <div className="cell">
              { this.props.metrics.tweetsWithGeo.length } tweets with geolocation ({ this.props.metrics.tweetsWithGeoRate }%)
            </div>
          </div>

          <div className="row -graphs">
            <div className="cell">
              <VictoryChart theme={VictoryTheme.material}>
                <VictoryLine
                  data={utils.formatDataToGraph(this.props.metrics.retweets, 'x', 'y')}
                  theme={VictoryTheme.material}
                  standalone={false} />

                <VictoryLine
                  data={utils.formatDataToGraph(this.props.metrics.favorites, 'x', 'y')}
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
                    y: [0, Math.max(...this.props.metrics.hours) * 1.1]
                  }}
                  data={utils.formatDataToGraph(this.props.metrics.hours, 'x', 'y')}
                  theme={VictoryTheme.material}
                  standalone={false} />

                <VictoryLegend
                  data={[{ name: 'UTC hours' }]}/>
              </VictoryChart>
            </div>
          </div>
        </div>

        {
          this.props.metrics.showMap &&
          <div className="mapWrapper">
            <GoogleMapReact
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              bootstrapURLKeys={{key: config.googleMaps.apiKey}}>

              {this.props.metrics.map.points.map((point, index) => <IconMap key={index} {...point} />)}
            </GoogleMapReact>
          </div>
        }
      </div>
    );
  }
}

Metrics = connect(
  (state) => ({
    metrics: selectors.selectedCardMetrics(state),
    selectedCardData: selectors.selectedCardData(state)
  })
)(Metrics);

export default Metrics;

import React from 'react';
import PropTypes from 'prop-types';
import Script from 'react-load-script';

class GColumnChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidUpdate() {
    const { loaded } = this.state;
    if (loaded) this.draw();
  }

  draw = () => {
    const { google } = this.state;
    const {
      data,
      width,
      height,
      labelY,
      padding,
      options,
    } = this.props;
    // eslint-disable-next-line new-cap
    const chartData = new google.visualization.arrayToDataTable(data);

    const fullOptions = {
      width: width - (padding * 2),
      height: height - (padding * 2),
      axisTitlesPosition: 'none',
      isStacked: true,
      vAxes: {
        0: { title: labelY },
        1: {
          gridlines: { color: 'transparent', count: 0 },
          textStyle: { color: 'transparent' },
        },
        2: {
          gridlines: { color: 'transparent', count: 0 },
          textStyle: { color: 'transparent' },
        },
      },
      series: {
        2: { targetAxisIndex: 1 },
        3: { targetAxisIndex: 1 },
        4: { targetAxisIndex: 2 },
        5: { targetAxisIndex: 2 },
      },
      ...options,
    };
    // eslint-disable-next-line no-undef
    const chart = new google.charts.Bar(document.getElementById('chart'));
    chart.draw(chartData, google.charts.Bar.convertOptions(fullOptions));
    google.visualization.events.addListener(chart, 'error', (err) => {
      google.visualization.errors.removeError(err.id);
    });
  }

  render = () => {
    const { loaded } = this.state;
    const { padding, loader } = this.props;
    let html = null;
    if (!loaded) {
      html = (
        <Script
          url="https://www.gstatic.com/charts/loader.js"
          onLoad={() => {
            // eslint-disable-next-line no-undef
            const { google } = window;
            google.charts.load('current', { packages: ['corechart', 'bar'] });
            google.charts.setOnLoadCallback(() => {
              this.setState({ loaded: true, google });
              this.draw();
            });
          }}
        />
      );
    }
    return (
      <div>
        {html}
        <div id="chart" style={{ padding }}>{loader}</div>
      </div>
    );
  }
}


GColumnChart.propTypes = {
  data: PropTypes.any.isRequired,
  labelY: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.number,
  loader: PropTypes.element,
  options: PropTypes.object,
};

GColumnChart.defaultProps = {
  labelY: '',
  width: null,
  height: null,
  padding: 0,
  loader: 'Cargando...',
  options: {},
};

export default GColumnChart;

import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';
import SmallBarStackGraph from './SmallBarStackGraph';
import GColumnChart from './GColumnChart';

const tooltipGen = (data) => (row, size) => {
  return `
    <div class='tm_tooltip'>
      ${data[row][0].v}
      <br />
      <b>${Number(size).toFixed(2)}</b>
    </div>
  `;
};

/**
 * Allow to select one of the available graphs
 *
 * @param {string}  graphType graph types name,
 *  this param validates which graph to render

  * @param {object}  data values to render,
  * @param {string}  labelX information showed in the graph label X,
  * @param {string}  labelY information showed in the graph label Y,
  * @param {string}  graphType Type of graph to render,
  * @param {string}  title title to render if the selected graph allows it,
  * @param {string}  subtitle subtitle to render if the selected graph allows it,
  * @param {array}   colors color palette to sort elements inside the graph
  * @param {string}  units information showed in the graph,
  * @param {number}  width dynamic width sent by parent component,
  * @param {number}  height dynamic height sent by parent component,
  * @param {number}  padding to determine chart padding
  * @param {number}  options object with extra options to pass to graph
  * @param {boolean} withTooltip boolean to determine if tooltip should be shown
 */
const GraphLoader = ({
  data,
  labelX,
  labelY,
  graphType,
  title,
  subtitle,
  colors,
  units,
  width,
  height,
  padding,
  options,
  withTooltip,
  dataGroups,
}) => {
  let graph = ('');
  switch (graphType) {
    case 'SmallBarStackGraph':
      graph = (
        <SmallBarStackGraph
          dataJSON={data}
          colors={colors}
          title={title}
          subtitle={subtitle}
          labelX={labelX}
          labelY={labelY}
          width={width}
          height="150"
          units={units}
        />
      );
      break;
    case 'ColumnChart':
      graph = (
        <GColumnChart
          data={data}
          width={width}
          height={height}
          loader={<div>Cargando...</div>}
          labelY={labelY}
          padding={padding}
          options={{
            ...options,
            colors,
          }}
          withTooltip={withTooltip}
          dataGroups={dataGroups}
          title={title}
        />
      );
      break;
    case 'BarChart':
      graph = (
        <Chart
          width={width}
          height={height}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={data}
          options={{
            legend: { position: 'bottom', maxLines: 5 },
            chartArea: { width: '70%' },
            isStacked: true,
            colors,
          }}
          // For tests
          rootProps={{ 'data-testid': '3' }}
        />
      );
      break;
    case 'Sankey':
      graph = (
        <Chart
          className="p30"
          width={width}
          height={height}
          chartType="Sankey"
          loader={<div>Loading Chart</div>}
          data={data}
          options={{
            sankey: {
              node: { colors },
            },
            chartArea: { width: '70%' },
            chart: {
              title,
              subtitle,
            },
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      );
      break;
    case 'TreeMap': {
      const tooltipData = Array.from(data);
      tooltipData.shift();
      graph = (
        <Chart
          className="p30"
          width={width}
          height={height}
          chartType="TreeMap"
          loader={<div>Loading Chart</div>}
          data={data}
          options={{
            minColor: '#9b3a33',
            midColor: '#d66c42',
            maxColor: '#dea857',
            headerHeight: 15,
            fontColor: 'black',
            showScale: true,
            generateTooltip: tooltipGen(tooltipData),
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      );
      break;
    }
    default:
      break;
  }
  return (
    <div className="graph">
      {graph}
    </div>
  );
};

GraphLoader.propTypes = {
  colors: PropTypes.array,
  graphType: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  // Array or object, depending on graphType
  data: PropTypes.any.isRequired,
  labelX: PropTypes.string,
  labelY: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  units: PropTypes.string,
  options: PropTypes.object,
  padding: PropTypes.number,
  withTooltip: PropTypes.bool,
  dataGroups: PropTypes.number,
};

GraphLoader.defaultProps = {
  title: '',
  subtitle: '',
  colors: [
    '#003d59', '#5a1d44', '#902130', '#6d819c', '#db9d6b', '#fb9334', '#fe6625', '#ab5727',
    '#44857d', '#167070',
  ],
  labelX: '',
  labelY: '',
  width: null,
  height: null,
  units: 'ha',
  options: {},
  padding: 0,
  withTooltip: true,
  dataGroups: 1,
};

export default GraphLoader;

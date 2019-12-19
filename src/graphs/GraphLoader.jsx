/** eslint verified */
import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';
import SmallBarStackGraph from './SmallBarStackGraph';
import GColumnChart from './GColumnChart';

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
          options={options}
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
          data={[
            ['City', '2010 Population', '2000 Population'],
            ['New York City, NY', 8175000, 8008000],
          ]}
          options={{
            title: 'Population of Largest U.S. Cities',
            chartArea: { width: '50%' },
            bars: 'vertical',
            isStacked: true,
            hAxis: {
              title: 'Total Population',
              minValue: 0,
            },
            vAxis: {
              title: 'City',
            },
          }}
          // For tests
          rootProps={{ 'data-testid': '3' }}
        />
      );
      break;
    case 'Sankey':
      graph = (
        <Chart
          width={width}
          height={height}
          chartType="Sankey"
          loader={<div>Loading Chart</div>}
          data={[
            ['From', 'To', 'Weight'],
            ['A', 'X', 5],
            ['A', 'Y', 7],
            ['A', 'Z', 6],
            ['B', 'X', 2],
            ['B', 'Y', 9],
            ['B', 'Z', 4],
          ]}
          options={{
            // Material design options
            chart: {
              title,
              subtitle,
            },
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      );
      break;
    case 'TreeMap':
      graph = (
        <Chart
          width={width}
          height={height}
          chartType="TreeMap"
          loader={<div>Loading Chart</div>}
          data={data}
          options={{
            minColor: '#fc907c',
            midColor: '#ffbf63',
            maxColor: '#edaa9d',
            headerHeight: 15,
            fontColor: 'black',
            showScale: true,
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      );
      break;
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
  colors: ['blue'],
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

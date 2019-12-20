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
          data={data}
          options={{
            legend: { position: 'bottom', maxLines: 5 },
            chartArea: { width: '70%' },
            isStacked: true,
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
          data={data}
          options={{
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
          data={[
            [
              'Location',
              'Parent',
              'Market trade volume (size)',
              'Market increase/decrease (color)',
            ],
            ['Global', null, 0, 0],
            ['America', 'Global', 0, 0],
            ['Europe', 'Global', 0, 0],
            ['Asia', 'Global', 0, 0],
            ['Australia', 'Global', 0, 0],
            ['Africa', 'Global', 0, 0],
            ['Brazil', 'America', 11, 10],
            ['USA', 'America', 52, 31],
            ['Mexico', 'America', 24, 12],
            ['Canada', 'America', 16, -23],
            ['France', 'Europe', 42, -11],
            ['Germany', 'Europe', 31, -2],
            ['Sweden', 'Europe', 22, -13],
            ['Italy', 'Europe', 17, 4],
            ['UK', 'Europe', 21, -5],
            ['China', 'Asia', 36, 4],
            ['Japan', 'Asia', 20, -12],
            ['India', 'Asia', 40, 63],
            ['Laos', 'Asia', 4, 34],
            ['Mongolia', 'Asia', 1, -5],
            ['Iran', 'Asia', 18, 13],
            ['Pakistan', 'Asia', 11, -52],
            ['Egypt', 'Africa', 21, 0],
            ['S. Africa', 'Africa', 30, 43],
            ['Sudan', 'Africa', 12, 2],
            ['Congo', 'Africa', 10, 12],
            ['Zaire', 'Africa', 8, 10],
          ]}
          options={{
            title,
            minColor: '#f00',
            midColor: '#ddd',
            maxColor: '#0d0',
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

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
            title,
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
          data={[
            ['From', 'To', 'Superficie en hectáreas'],
            ['Reserva Natural de la Sociedad Civil: Amanecer en el Palmar 1', '5 Km', 4.98000],
            ['Reserva Natural de la Sociedad Civil: Amanecer en el Palmar 2', '5 Km', 6.61000],
            ['Reserva Natural de la Sociedad Civil: El Madrono', '5 Km', 206.16000],
            ['Reserva Natural de la Sociedad Civil: Fundo Palmarito', '15 Km', 145.42000],
            ['Reserva Natural de la Sociedad Civil: Fundo Palmarito', '25 Km', 302.14000],
            ['Reserva Natural de la Sociedad Civil: Hato Venecia De Guanapalo', '25 Km', 6510.23000],
            ['Reserva Natural de la Sociedad Civil: Cano Viejo', '25 Km', 149.91000],
            ['Reserva Natural de la Sociedad Civil: La Travesada', '25 Km', 578.17000],
            ['Reserva Natural de la Sociedad Civil: La Bramadora', '25 Km', 1283.84000],
          ]}
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
          data={data}
          options={{
            minColor: '#EF0928',
            midColor: '#FB6A2A',
            maxColor: '#DF9735',
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

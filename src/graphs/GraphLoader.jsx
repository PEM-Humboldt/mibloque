/** eslint verified */
import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';
import SmallBarStackGraph from './SmallBarStackGraph';

const GraphLoader = (
  {
  /**
   * Allow to select one of the available graphs
   *
   * @param {string}  graphType graph types name,
   *  this param validates which graph to render
   * @param {array} colors color palette to sort elements inside the graph
   * @param {object}  data values to render,
   * @param {string}  title title to render if the selected graph allows it,
   * @param {string}  subtitle subtitle to render if the selected graph allows it,
   * @param {string}  labelX information showed in the graph label X,
   * @param {string}  labelY information showed in the graph label Y,
   * @param {string}  units information showed in the graph,
   * @param {string}  width dynamic width sent by parent component,
   * @param {string}  height dynamic height sent by parent component,
   */
    colors,
    data,
    title,
    subtitle,
    graphType,
    labelX,
    labelY,
    units,
    width,
    height,
  },
) => (
  <div>
    {
      (graphType === 'SmallBarStackGraph')
        ? (
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
        )
        : ('')
    }
    {
      (graphType === 'Line')
        ? (
          <Chart
            width={width}
            height={height}
            chartType="Line"
            loader={<div>Cargando...</div>}
            data={[
              [
                '% bosque',
                'Zoonobioma',
                'Orobioma',
                'Helobioma',
              ],
              [1, 37.8, 80.8, 41.8],
              [2, 30.9, 69.5, 32.4],
              [3, 25.4, 57, 25.7],
              [4, 11.7, 18.8, 10.5],
              [5, 11.9, 17.6, 10.4],
              [6, 8.8, 13.6, 7.7],
              [7, 7.6, 12.3, 9.6],
              [8, 12.3, 29.2, 10.6],
              [9, 16.9, 42.9, 14.8],
              [10, 12.8, 30.9, 11.6],
              [11, 5.3, 7.9, 4.7],
              [12, 6.6, 8.4, 5.2],
              [13, 4.8, 6.3, 3.6],
              [14, 4.2, 6.2, 3.4],
            ]}
            options={{
              chart: {
                title,
                subtitle,
              },
            }}
          />
        )
        : ('')
    }
    {
      (graphType === 'PieChart')
        ? (
          <Chart
            width={width}
            height={height}
            chartType="PieChart"
            loader={<div>Cargando...</div>}
            data={[
              ['Pizza', 'Popularity'],
              ['Pepperoni', 33],
              ['Hawaiian', 26],
              ['Mushroom', 22],
              ['Sausage', 10], // Below limit.
              ['Anchovies', 9], // Below limit.
            ]}
            options={{
              title,
              subtitle,
            }}
          />
        )
        : ('')
    }
    {
      (graphType === 'BubbleChart')
        ? (
          <Chart
            width={width}
            height={height}
            chartType="BubbleChart"
            loader={<div>Cargando...</div>}
            data={[
              ['ID', 'Life Expectancy', 'Fertility Rate', 'Region', 'Population'],
              ['CAN', 80.66, 1.67, 'North America', 33739900],
              ['DEU', 79.84, 1.36, 'Europe', 81902307],
              ['DNK', 78.6, 1.84, 'Europe', 5523095],
              ['EGY', 72.73, 2.78, 'Middle East', 79716203],
              ['GBR', 80.05, 2, 'Europe', 61801570],
              ['IRN', 72.49, 1.7, 'Middle East', 73137148],
              ['IRQ', 68.09, 4.77, 'Middle East', 31090763],
              ['ISR', 81.55, 2.96, 'Middle East', 7485600],
              ['RUS', 68.6, 1.54, 'Europe', 141850000],
              ['USA', 78.09, 2.05, 'North America', 307007000],
            ]}
            options={{
              title,
              hAxis: { title: 'Life Expectancy' },
              vAxis: { title: 'Fertility Rate' },
              bubble: { textStyle: { fontSize: 11 } },
            }}
          />
        )
        : ('')
    }
  </div>
);

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
};

GraphLoader.defaultProps = {
  title: '',
  subtitle: '',
  colors: ['blue'],
  labelX: '',
  labelY: '',
  width: 400,
  height: 200,
  units: 'ha',
};

export default GraphLoader;

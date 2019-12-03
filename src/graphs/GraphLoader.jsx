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

   * @param {object}  data values to render,
   * @param {string}  labelX information showed in the graph label X,
   * @param {string}  labelY information showed in the graph label Y,
   * @param {string}  graphType Type of graph to render,
   * @param {string}  title title to render if the selected graph allows it,
   * @param {string}  subtitle subtitle to render if the selected graph allows it,
   * @param {array}   colors color palette to sort elements inside the graph
   * @param {string}  units information showed in the graph,
   * @param {string}  width dynamic width sent by parent component,
   * @param {string}  height dynamic height sent by parent component,
   */
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
    {
      (graphType === 'Bar')
        ? (
          <Chart
            width={width}
            height={height}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={[
              ['Year', 'Sales', 'Expenses', 'Profit'],
              ['2014', 1000, 400, 200],
            ]}
            options={{
              // Material design options
              chart: {
                title,
                subtitle,
              },
            }}
            // For tests
            rootProps={{ 'data-testid': '2' }}
          />
        )
        : ('')
    }
    {
      (graphType === 'BarChart')
        ? (
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
        )
        : ('')
    }
    {
      (graphType === 'Sankey')
        ? (
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
        )
        : ('')
    }
    {
      (graphType === 'TreeMap')
        ? (
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

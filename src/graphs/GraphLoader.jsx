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
   * @param {string}  width dynamic width sent by parent component,
   * @param {string}  units information showed in the graph,
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
            height={300}
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
  units: PropTypes.string,
};

GraphLoader.defaultProps = {
  title: '',
  subtitle: '',
  colors: ['blue'],
  labelX: '',
  labelY: '',
  width: 400,
  units: 'ha',
};

export default GraphLoader;

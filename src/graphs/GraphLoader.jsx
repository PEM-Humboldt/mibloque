/** eslint verified */
import React from 'react';
import PropTypes from 'prop-types';
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
   * @param {string}  graphTitle title to render if the selected graph allows it,
   * @param {string}  units information showed in the graph,
   */
    colors,
    data,
    graphTitle,
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
            graphTitle={graphTitle}
            labelX={labelX}
            labelY={labelY}
            width={width}
            height="150"
            units={units}
          />
        )
        : ('')
    }
  </div>
);

GraphLoader.propTypes = {
  colors: PropTypes.array,
  graphType: PropTypes.string.isRequired,
  graphTitle: PropTypes.string,
  // Array or object, depending on graphType
  data: PropTypes.any.isRequired,
  labelX: PropTypes.string,
  labelY: PropTypes.string,
  width: PropTypes.number,
  units: PropTypes.string,
};

GraphLoader.defaultProps = {
  graphTitle: '',
  colors: ['blue'],
  labelX: '',
  labelY: '',
  width: 400,
  units: 'ha',
};

export default GraphLoader;

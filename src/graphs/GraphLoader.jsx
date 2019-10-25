/** eslint verified */
import React from 'react';
import PropTypes from 'prop-types';
import SmallBarStackGraph from './SmallBarStackGraph';

const GraphLoader = (
  {
    graphType, data, graphTitle, labelY, width, colors,
    units,
    handlerInfoGraph,
    graphDescription,
    openInfoGraph,
  },
) => (
  <div>
    {
      (graphType === 'SmallBarStackGraph') ? (
        <SmallBarStackGraph
          dataJSON={data}
          colors={colors}
          graphTitle={graphTitle}
          labelY={labelY}
          width={width}
          height="150"
          units={units}
          openInfoGraph={openInfoGraph}
          handlerInfoGraph={handlerInfoGraph}
          graphDescription={graphDescription}
        />
      ) : ('')
    }
  </div>
);

GraphLoader.propTypes = {
  colors: PropTypes.array,
  graphType: PropTypes.string.isRequired,
  graphTitle: PropTypes.string,
  // Array or object, depending on graphType
  data: PropTypes.any.isRequired,
  labelY: PropTypes.string,
  width: PropTypes.number,
  units: PropTypes.string,
  handlerInfoGraph: PropTypes.func,
  openInfoGraph: PropTypes.string,
  graphDescription: PropTypes.string,
};

GraphLoader.defaultProps = {
  graphTitle: '',
  colors: ['blue'],
  labelY: '',
  width: 400,
  units: 'ha',
  handlerInfoGraph: () => {},
  openInfoGraph: null,
  graphDescription: null,
};

export default GraphLoader;

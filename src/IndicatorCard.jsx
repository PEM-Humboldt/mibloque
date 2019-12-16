import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import RenderGraph from './graphs/RenderGraph';
import GraphData from './commons/GraphData';

class IndicatorCard extends React.Component {
  /**
   * Return correct CSS class based on card size
   *
   * @param {string} size Indicator card size
   */
  validClassIndicator = (size) => {
    let validClass = null;
    switch (size) {
      case 1:
        validClass = 'boxes';
        break;
      case 2:
        validClass = 'boxes box2';
        break;
      case 3:
        validClass = 'boxes box3';
        break;
      default:
        validClass = 'boxes';
        break;
    }
    return { validClass };
  };

  render() {
    const {
      areaName, code, size, name, values, indicatorIds, indicatorsName,
    } = this.props;
    const indicatorIdsQuery = indicatorIds.map((ind) => `ids=${ind}`).join('&');
    const className = this.validClassIndicator(size).validClass;
    
    if (!values) return null;
    return (
      <Link
        to={{
          pathname: `/indicator/${areaName}`,
          search: `?${indicatorIdsQuery}`,
        }}
      >
        <div className={className} key={name}>
          <RenderGraph
            data={GraphData.prepareData(code, values, null, indicatorsName, name)}
            labelY="Hectáreas"
            graph={GraphData.validGraphType(code).validGraphType}
            title={name}
            padding={0}
            options={{ legend: { position: 'none' } }}
            withTooltip={false}
          />
        </div>
      </Link>
    );
  }
}

IndicatorCard.propTypes = {
  code: PropTypes.number,
  name: PropTypes.string,
  values: PropTypes.any,
  size: PropTypes.number,
  indicatorIds: PropTypes.array,
  indicatorsName: PropTypes.array.isRequired,
  areaName: PropTypes.string.isRequired,
};

IndicatorCard.defaultProps = {
  code: 1,
  name: '',
  values: null,
  size: 1,
  indicatorIds: [],
};

export default IndicatorCard;

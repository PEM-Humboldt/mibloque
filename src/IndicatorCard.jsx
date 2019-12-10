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

  /**
   * Return correct graph type based on card code
   *
   * @param {string} code Indicator card code to find graph type
   */
  validGraphType = (code) => {
    let validGraphType = null;
    switch (code) {
      case 1:
        validGraphType = 'ColumnChart';
        break;
      case 2:
        validGraphType = 'Sankey';
        break;
      case 3:
        validGraphType = 'TreeMap';
        break;
      case 4:
        validGraphType = 'BarChart';
        break;
      default:
        validGraphType = 'BarChart';
        break;
    }
    return { validGraphType };
  };

  render() {
    const {
      areaName, code, size, name, values, indicatorIds, indicatorsName,
    } = this.props;
    const indicatorIdsQuery = indicatorIds.map((ind) => `ids=${ind}`).join('&');
    console.log(this.props);

    if (!values) return null;
    console.log(areaName, code, size, name, values, indicatorIds, indicatorsName);
    return (
      <Link
        to={{
          pathname: `/indicator/${areaName}`,
          search: `?${indicatorIdsQuery}`,
        }}
      >
        <div className={this.validClassIndicator(size).validClass} key={name}>
          {RenderGraph(
            GraphData.prepareData(code, values, null, indicatorsName),
            '',
            '',
            this.validGraphType(code).validGraphType,
            name,
            null,
            ['#5f8f2c', '#fff'],
            null,
          )}
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

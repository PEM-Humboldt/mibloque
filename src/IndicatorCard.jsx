import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RenderGraph from './graphs/RenderGraph';

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
        validGraphType = 'Bar';
        break;
      case 2:
        validGraphType = 'Sankey';
        break;
      case 3:
        validGraphType = 'TreeMap';
        break;
      case 4:
        validGraphType = 'Line';
        break;
      default:
        validGraphType = 'Line';
        break;
    }
    return { validGraphType };
  };

  render() {
    const {
      code, size, name, values,
    } = this.props;

    return (
      <Link to="/indicator">
        <div className={this.validClassIndicator(size).validClass} key={code}>
          {values
            ? RenderGraph(
              values,
              '',
              '',
              this.validGraphType(code).validGraphType,
              name,
              null,
              ['#5f8f2c', '#fff'],
              null,
            )
            : 'Cargando...'}
        </div>
      </Link>
    );
  }
}

IndicatorCard.propTypes = {
  code: PropTypes.number,
  name: PropTypes.string,
  values: PropTypes.array,
  size: PropTypes.number,
};

IndicatorCard.defaultProps = {
  code: 1,
  name: '',
  values: [],
  size: 1,
};

export default IndicatorCard;

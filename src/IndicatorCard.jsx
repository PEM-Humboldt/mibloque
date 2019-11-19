import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RenderGraph from './graphs/RenderGraph';

class IndicatorCard extends React.Component {
  /**
   * Return correct CSS class and GraphType based on card size
   *
   * @param {string} size Indicator card size
   */
  validClassIndicator = (size) => {
    let validClass = null;
    let validGraphType = null;
    switch (size) {
      case '1':
        validClass = 'boxes';
        validGraphType = 'Line';
        break;
      case '2':
        validClass = 'boxes box2';
        validGraphType = 'PieChart';
        break;
      case '3':
        validClass = 'boxes box3';
        validGraphType = 'BubbleChart';
        break;
      default:
        validClass = 'boxes';
        validGraphType = 'Line';
        break;
    }
    return { validClass, validGraphType };
  };

  render() {
    const {
      id, size, typeName, values,
    } = this.props;
    return (
      <Link to="/indicator">
        <div className={this.validClassIndicator(size).validClass} key={id}>
          {values
            ? RenderGraph(
              values,
              '',
              '',
              this.validClassIndicator(size).validGraphType,
              typeName,
              id,
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
  id: PropTypes.string,
  typeName: PropTypes.string,
  values: PropTypes.array,
  size: PropTypes.string,
};

IndicatorCard.defaultProps = {
  id: '',
  typeName: '',
  values: [],
  size: '1',
};

export default IndicatorCard;

import React from 'react';
import PropTypes from 'prop-types';

const validClassIndicator = (size) => {
  let validClass = null;
  switch (size) {
    case '1':
      validClass = 'boxes';
      break;
    case '2':
      validClass = 'boxes box2';
      break;
    case '3':
      validClass = 'boxes box3';
      break;
    default:
      validClass = 'boxes';
      break;
  }
  return validClass;
};

const IndicatorCard = ({
  id, typeName, values, size,
}) => (
  <div className={validClassIndicator(size)} key={id}>
    <h2>
      {`typeName: ${typeName}`}
    </h2>
    <h3>
      {`size: ${size}`}
    </h3>
    <h3>
      {`values: ${values}`}
    </h3>
  </div>
);

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

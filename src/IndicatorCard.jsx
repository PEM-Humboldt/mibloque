import React from 'react';
import PropTypes from 'prop-types';

const validClassIndicator = (type) => {
  let validClass = null;
  switch (type) {
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
  id, name, sedimentaryBasin, rating, type,
}) => (
  <div className={validClassIndicator(type)} key={id}>
    <h2>
      {name}
    </h2>
    <h3>
      {sedimentaryBasin}
    </h3>
    <h3>
      {rating}
    </h3>
    <h3>
      {type}
    </h3>
  </div>
);

IndicatorCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  sedimentaryBasin: PropTypes.string,
  rating: PropTypes.string,
  type: PropTypes.string,
};

IndicatorCard.defaultProps = {
  id: '',
  name: '',
  sedimentaryBasin: '',
  rating: '',
  type: '1',
};

export default IndicatorCard;

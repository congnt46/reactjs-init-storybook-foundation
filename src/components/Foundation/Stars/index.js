import React from 'react';
import ReactStars from 'react-rating-stars-component';
import PropTypes from 'prop-types';
import { colors } from '../Variables';
import Icon from '../Icon';

const MAX_RATING = 5;

const StarPropTypes = {
  transparent: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'larger']),
};

const StarDefaultProps = {
  transparent: true,
  size: 'small',
};

function EmptyStart({ size, transparent }) {
  const iconType = transparent ? 'fa-star-o' : 'fa-star';

  return (
    <Icon icon={iconType} size={size} />
  );
}

EmptyStart.propTypes = StarPropTypes;
EmptyStart.defaultProps = StarDefaultProps;

function HalfStart({ size, transparent }) {
  const iconType = transparent ? 'fa-star-half-o' : 'fa-star';

  return (
    <Icon icon={iconType} size={size} />
  );
}

HalfStart.propTypes = StarPropTypes;
HalfStart.defaultProps = StarDefaultProps;

function FilledStart({ size }) {
  return (
    <Icon icon="fa-star" size={size} />
  );
}

FilledStart.propTypes = {
  size: StarDefaultProps.size.isRequired,
};

const getColorScheme = ({ transparent }) => {
  return {
    color: transparent ? colors.gray : colors['gray-light'],
    activeColor: transparent ? colors.gray : colors['gray-dark'],
  };
};

function Stars({ value, size, transparent, className }) {
  const verifyStarsValue = (rating) => (rating > MAX_RATING ? MAX_RATING : rating);

  return (
    <ReactStars
      count={MAX_RATING}
      value={verifyStarsValue(value)}
      isHalf
      edit={false}
      emptyIcon={<EmptyStart size={size} transparent={transparent} />}
      halfIcon={<HalfStart size={size} transparent={transparent} />}
      filledIcon={<FilledStart size={size} transparent={transparent} />}
      classNames={`custom-rating-stars ${className}`}
      {...getColorScheme({ transparent })}
    />
  );
}

Stars.propTypes = {
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
  ...StarPropTypes,
};

Stars.defaultProps = {
  value: 0,
  className: '',
  ...StarDefaultProps,
};

export default Stars;

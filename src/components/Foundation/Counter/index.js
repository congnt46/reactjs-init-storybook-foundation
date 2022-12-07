import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import SizePropType from 'types/prop-types/SizePropType';

function Counter({ className, children, size, color, textColor }) {
  return (
    <span className={cx(`counter counter--${size} counter--${color} counter--text--${textColor}`, className)}>
      {children}
    </span>
  );
}

Counter.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]).isRequired,
  size: SizePropType,
  className: PropTypes.string,
  color: PropTypes.string,
  textColor: PropTypes.string,
};

Counter.defaultProps = {
  size: 'medium',
  color: 'primary',
  textColor: 'white',
};

export default Counter;

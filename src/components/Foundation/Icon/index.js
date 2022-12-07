import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import SvgIcons from './Svg';
import FontAwesomeIcon from './FontAwesome';

function Icon({ icon, color, hoverColor, size, className, onClick }) {
  const Component = (typeof icon === 'string') && SvgIcons[icon];
  const clickable = Boolean(onClick);
  const defaultColor = color ?? (clickable ? 'gray-dark' : null);
  const defaultHoverColor = hoverColor ?? (clickable ? 'black' : null);
  const classes = cx(
    'icon',
    `icon-${Component ? 'svg' : 'fa'}`,
    `icon--${size}`,
    defaultColor && `icon--${defaultColor}`,
    defaultHoverColor && `icon--hover--${defaultHoverColor}`,
    clickable && 'icon--clickable',
    className,
  );
  if (Component) {
    return <Component className={classes} onClick={onClick} />;
  }
  return <FontAwesomeIcon icon={icon} className={classes} onClick={onClick} />;
}

Icon.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'larger']),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Icon.defaultProps = {
  size: 'medium',
  color: null,
  hoverColor: null,
  className: '',
  onClick: null,
};

export default Icon;

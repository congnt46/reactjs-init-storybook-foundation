import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function FontAwesomeIcon({ icon, className, onClick }) {
  const classes = cx(
    className,
    icon,
    'fa',
  );
  return (
    <i className={classes} aria-hidden="true" onClick={onClick} />
  );
}

FontAwesomeIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

FontAwesomeIcon.defaultProps = {
  onClick: null,
};

export default FontAwesomeIcon;

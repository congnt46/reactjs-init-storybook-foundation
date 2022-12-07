import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import './styles.scss';

function Toggle({ checked, onClick, className, name }) {
  const classes = cx('toggle-switch', className);
  return (
    <label className={classes} aria-label="toggle">
      <input name={name} aria-labelledby="toggle" type="checkbox" checked={checked} onClick={onClick} />
      <span className="toggle-slider" />
    </label>
  );
}

Toggle.propTypes = {
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
};

Toggle.defaultProps = {
  checked: false,
  className: null,
};

export default Toggle;


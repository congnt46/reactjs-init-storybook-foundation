import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from '../Icon';
import Text from '../Text';

function Checkbox({ className, checked, label, onChange, value }) {
  const classes = cx('checkbox-item', className);
  function renderCheckboxIcon() {
    if (checked) { return <Icon icon="fa-check-square" className="checkbox-input checked" />; }
    return <Icon icon="fa-square-o" className="checkbox-input" />;
  }

  function handleChange() {
    if (onChange) {
      onChange(value);
    }
  }

  return (
    <div className={classes} onClick={handleChange} onKeyDown={handleChange}>
      {renderCheckboxIcon()}
      <Text className="checkbox-label">
        {label}
      </Text>
    </div>
  );
}

Checkbox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  checked: false,
  onChange: null,
  className: '',
  label: '',
};

export default Checkbox;

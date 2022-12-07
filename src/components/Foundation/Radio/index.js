import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import Text from '../Text';
import cx from 'classnames';

function Radio({ className, checked, label, onChange, value }) {
  const classes = cx('radio-item', className);

  function renderRadioIcon() {
    if (checked) {
      return <Icon icon="fa-dot-circle-o" className="radio-input checked" />;
    }
    return <Icon icon="fa-circle-o" className="radio-input" />;
  }

  function handleChange() {
    if (onChange) {
      onChange(value);
    }
  }

  return (
    <div className={classes} onClick={handleChange} onKeyDown={handleChange}>
      {renderRadioIcon()}
      <Text className="radio-label">{label}</Text>
    </div>
  );
}

Radio.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Radio.defaultProps = {
  checked: false,
  onChange: null,
  label: '',
};

export default Radio;

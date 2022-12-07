import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from '../Icon';

function Tab({ key, label, icon, iconSize, active, onChange, className }) {
  const classes = cx('tab__title', {
    'tab__title--active': active,
  }, className);

  function onClickTab() {
    if (onChange) {
      onChange(key);
    }
  }

  function renderIcon() {
    if (icon) {
      return <Icon icon={icon} size={iconSize} />;
    }
    return null;
  }

  return (
    <div className={classes} onClick={onClickTab} onKeyDown={onClickTab} >
      {label}
      {renderIcon()}
    </div>
  );
}

Tab.propTypes = {
  key: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
  iconSize: PropTypes.oneOf(['small', 'medium', 'large', 'larger']),
  active: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  forceRender: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

Tab.defaultProps = {
  active: false,
  forceRender: false,
  onChange: null,
  className: null,
  iconSize: 'medium',
};

export default Tab;

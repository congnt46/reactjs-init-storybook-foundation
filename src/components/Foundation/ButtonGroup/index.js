import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ChildrenPropType, SizePropType } from 'types/prop-types';

import Item from './Item';

function ButtonGroup({ children, size, value, onChange, className }) {
  const [activeKey, setActiveKey] = useState(value);

  React.useEffect(() => {
    setActiveKey(value);
  }, [value]);

  function handleChange(key) {
    if (activeKey === key) {
      return;
    }
    setActiveKey(key);
    if (onChange) {
      onChange(key);
    }
  }

  const classes = cx('btn-group', className);

  return (
    <div className={classes}>
      {React.Children.map(children, (child) => {
        if (!child) { return null; }
        return {
          ...child,
          props: {
            ...child.props,
            active: activeKey === child.props.value,
            size,
            onClick() {
              handleChange(child.props.value);
            },
          },
        };
      })}
    </div>
  );
}

ButtonGroup.propTypes = {
  children: ChildrenPropType.isRequired,
  size: SizePropType,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

ButtonGroup.defaultProps = {
  size: 'small',
  value: null,
  onChange: null,
  className: null,
};

ButtonGroup.Item = Item;

export default ButtonGroup;

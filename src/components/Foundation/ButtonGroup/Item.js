import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ChildrenPropType, SizePropType } from 'types/prop-types';

import Text from '../Text';

function Item({ children, active, className, ...rest }) {
  const classes = cx('btn-group__item', {
    active,
  }, className);

  function renderChildren() {
    if (typeof children === 'string') {
      return <Text bold small className="btn-group__text">{children}</Text>;
    }
    return children;
  }

  return (
    <button type="button" className={classes} {...rest}>{renderChildren()}</button>
  );
}

Item.propTypes = {
  value: PropTypes.string.isRequired,
  children: ChildrenPropType.isRequired,
  size: SizePropType,
  active: PropTypes.bool,
  className: PropTypes.string,
};

Item.defaultProps = {
  size: 'small',
  active: false,
  className: null,
};

export default Item;

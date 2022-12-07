import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function StackedItem({ children, className }) {
  const classes = cx('stacked-item', className);
  return (
    <div className={classes}>
      {children}
    </div>
  );
}

StackedItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

StackedItem.defaultProps = {
  className: null,
};

export default StackedItem;

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Title from '../Title';

import StackedItem from './StackedItem';

function StackedGroup({ children, className, title }) {
  const classes = cx('stacked-group', className);
  function renderTitle() {
    if (typeof title === 'function') {
      return title();
    }
    return <Title tag="h4">{title}</Title>;
  }
  return (
    <div className={classes}>
      <div className="stacked-group__title">{renderTitle()}</div>
      <div className="stacked-group__content">
        {children}
      </div>
    </div>
  );
}

StackedGroup.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

StackedGroup.defaultProps = {
  className: null,
};

StackedGroup.Item = StackedItem;

StackedGroup.prototype.Item = StackedItem;

export default StackedGroup;

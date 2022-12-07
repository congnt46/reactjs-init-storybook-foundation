import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ChildrenPropType } from 'types/prop-types';

function Column({ span, offset, className = '', children }) {
  const classes = cx(
    className,
    span ? `col-${span}` : 'col',
    offset && `offset-${offset}`,
  );
  return (
    <div className={classes}>
      {children}
    </div>
  );
}

Column.propTypes = {
  className: PropTypes.string,
  children: ChildrenPropType.isRequired,
  span: PropTypes.number,
  offset: PropTypes.number,
};

export default Column;

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ChildrenPropType } from 'types/prop-types';

function Row({ className = '', children }) {
  const classes = cx(
    'row',
    className,
  );
  return <div className={classes}>{children}</div>;
}

Row.propTypes = {
  className: PropTypes.string,
  children: ChildrenPropType.isRequired,
};

export default Row;

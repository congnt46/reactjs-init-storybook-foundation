import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link as RouteLink } from 'react-router-dom';

import { ChildrenPropType } from 'types/prop-types';

function Link({ tag, className, ...rest }) {
  const classes = cx('btn btn-link', className);

  if (tag === 'a') {
    return (
      <RouteLink {...rest} />
    );
  }
  return (
    <button className={classes} type="button" {...rest} />
  );
}

Link.defaultProps = {
  tag: 'a',
};

Link.propTypes = {
  tag: PropTypes.oneOf(['a', 'button']),
  to: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: ChildrenPropType.isRequired,
  className: PropTypes.string,
};

Link.defaultProps = {
  className: '',
};

export default Link;

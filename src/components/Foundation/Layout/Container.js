import React from 'react';
import PropTypes from 'prop-types';
import { ChildrenPropType } from 'types/prop-types';

function Container({ className = '', children }) {
  return <div className={`container-fluid ${className}`}>{children}</div>;
}

Container.propTypes = {
  className: PropTypes.string,
  children: ChildrenPropType.isRequired,
};

export default Container;

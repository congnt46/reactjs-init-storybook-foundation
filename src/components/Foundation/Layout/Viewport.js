import React from 'react';
import PropTypes from 'prop-types';
import { ChildrenPropType } from 'types/prop-types';

import Column from './Column';
import Row from './Row';

export function ViewportContainer({ children }) {
  return <div className="h-100 d-flex flex-column">{children}</div>;
}

ViewportContainer.propTypes = {
  children: ChildrenPropType.isRequired,
};

export function ViewportRow({ className = '', children }) {
  return (
    <Row className={`no-gutters flex-shrink-0 ${className}`}>{children}</Row>
  );
}

ViewportRow.propTypes = {
  className: PropTypes.string,
  children: ChildrenPropType.isRequired,
};

export function ViewportFullHeightRow({ className = '', children }) {
  return (
    <Row
      className={`no-gutters flex-fill grid-viewport-fullheight-row ${className}`}
    >
      {children}
    </Row>
  );
}

ViewportFullHeightRow.propTypes = {
  className: PropTypes.string,
  children: ChildrenPropType.isRequired,
};

export function LeftOverlapColumn({ span, className = '', children }) {
  return (
    <Column span={span} className={`col-overlap-left ${className}`}>
      {children}
    </Column>
  );
}

LeftOverlapColumn.propTypes = {
  className: PropTypes.string,
  children: ChildrenPropType.isRequired,
  span: PropTypes.number,
};

export function LeftFloatingColumn({ span, className = '', children }) {
  return (
    <Column span={span} className={`col-attached-left ${className}`}>
      {children}
    </Column>
  );
}

LeftFloatingColumn.propTypes = {
  className: PropTypes.string,
  children: ChildrenPropType.isRequired,
  span: PropTypes.number,
};

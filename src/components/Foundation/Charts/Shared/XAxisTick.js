import React from 'react';
import PropTypes from 'prop-types';

function XAxisTick({ x, y, payload, formatter }) {
  return (
    <text x={x - 20} y={y} className="text--small text--gray tick-label">
      { formatter?.(payload.value) ?? payload.value }
    </text>
  );
}

XAxisTick.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  payload: PropTypes.object.isRequired,
  formatter: PropTypes.func,
};

XAxisTick.defaultProps = {
  formatter: null,
};

export default XAxisTick;

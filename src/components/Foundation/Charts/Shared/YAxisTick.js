import React from 'react';
import PropTypes from 'prop-types';

function YAxisTick({ x, y, payload, formatter }) {
  return (
    <text x={x - 4} y={y + 4} className="text--small text--gray tick-label" textAnchor="end">
      { formatter?.(payload.value) ?? payload.value }
    </text>
  );
}

YAxisTick.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  payload: PropTypes.object.isRequired,
  formatter: PropTypes.func,
};

YAxisTick.defaultProps = {
  formatter: null,
};


export default YAxisTick;

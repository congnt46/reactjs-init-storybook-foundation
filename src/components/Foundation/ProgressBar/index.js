import React from 'react';
import PropTypes from 'prop-types';

function ProgressBar({ progress }) {
  let percentage = progress;
  if (percentage < 0) {
    percentage = 0;
  } else if (percentage > 100) {
    percentage = 100;
  }
  return (
    <div className="progress">
      <span style={{ width: `${percentage}%` }} className="progress__bar" />
    </div>
  );
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;


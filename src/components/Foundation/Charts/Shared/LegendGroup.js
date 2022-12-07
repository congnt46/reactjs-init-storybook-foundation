import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Text from '../../Text';

function LegendGroup({ className, label, value, color }) {
  return (
    <li className={cx('legend-group', className)}>
      <div className="legend-group__key">
        {color && <span className="legend-group__key-color" style={{ backgroundColor: color }} />}
        <Text semibold small color="gray-darkest">{label}</Text>
      </div>
      {value && <Text semibold theme="gray">{value}</Text>}
    </li>
  );
}

LegendGroup.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default LegendGroup;

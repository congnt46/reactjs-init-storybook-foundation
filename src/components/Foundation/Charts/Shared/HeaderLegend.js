import React from 'react';
import PropTypes from 'prop-types';

import LegendGroup from 'components/Foundation/Charts/Shared/LegendGroup';

function HeaderLegend({ payload }) {
  return (
    <ul className="header-legend">
      {
        payload.map(({ dataKey, color }) => dataKey && (
          <LegendGroup
            key={dataKey}
            className="header-legend__group"
            label={dataKey}
            color={color}
          />
        ))
      }
    </ul>
  );
}

HeaderLegend.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HeaderLegend;

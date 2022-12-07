import React from 'react';
import PropTypes from 'prop-types';
import Text from 'components/Foundation/Text';
import { ChartTooltipPropType } from 'types/prop-types';

function Tooltip({ active, payload, label, description, labelFormatter, valueFormatter }) {
  const formattedLabel = labelFormatter ? labelFormatter(label) : label;

  return active && payload && (
    <div className="chart-tooltip">
      <Text className="chart-tooltip__label" semibold small>{formattedLabel}</Text>
      {
        payload.map(({ value, color, dataKey }) => {
          const formattedValue = valueFormatter ? valueFormatter(value) : value;
          return (
            <div className="chart-tooltip__value-container" key={dataKey}>
              {payload.length > 1 && (
                <div className="chart-tooltip__key-container">
                  <div className="legend-group__key-color" style={{ backgroundColor: color }} />
                  <Text className="chart-tooltip__key" semibold>{dataKey}</Text>
                </div>
              )}
              <Text className="chart-tooltip__value" semibold>{formattedValue}</Text>
            </div>
          );
        })
      }
      {description && <Text className="chart-tooltip__description" theme="gray" small>{description}</Text>}
    </div>
  );
}

Tooltip.propTypes = {
  ...ChartTooltipPropType,
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
};

export default Tooltip;

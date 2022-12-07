import { Cell, Pie as RechartPie } from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';
import { colors } from '../../Variables';

const colorSet = {
  primary: [
    colors['tertiary-2-darker'],
    colors['tertiary-2'],
    colors['tertiary-2-lighter'],
    colors['tertiary-1-darker'],
    colors['tertiary-1'],
    colors['tertiary-1-lighter'],
  ],
  secondary: [
    colors.error,
    colors['tertiary-1-darker'],
    colors['tertiary-1'],
    colors['tertiary-1-lighter'],
    colors['success-darker'],
    colors.success,
    colors['success-lighter'],
    colors['tertiary-2-darker'],
    colors['tertiary-2'],
    colors['tertiary-2-lighter'],
    colors.secondary,
  ],
  tertiary: [
    colors.success,
    colors.error,
    colors['tertiary-2'],
    colors.secondary,
  ],
};

function Pie({ data, dataKey, innerRadius, outerRadius, theme }) {
  return (
    <RechartPie data={data} dataKey={dataKey} innerRadius={innerRadius} outerRadius={outerRadius}>
      {data.map((entry, index) => (
        <Cell key={`cell-${dataKey}`} fill={colorSet[theme][index]} />
      ))}
    </RechartPie>
  );
}

Pie.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataKey: PropTypes.string.isRequired,
  innerRadius: PropTypes.number.isRequired,
  outerRadius: PropTypes.number.isRequired,
  theme: PropTypes.string,
};

Pie.defaultProps = {
  theme: 'primary',
};

export default Pie;

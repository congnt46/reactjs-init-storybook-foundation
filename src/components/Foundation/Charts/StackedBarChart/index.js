import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  BarChart as RechartsBarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip as RechartTooltip,
} from 'recharts';

import XAxisTick from '../Shared/XAxisTick';
import YAxisTick from '../Shared/YAxisTick';
import HeaderLegend from '../Shared/HeaderLegend';
import { colors } from '../../Variables';
import Tooltip from '../Shared/Tooltip';
import { ChartTooltipPropType } from 'types/prop-types';

export const colorSet = {
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
    colors['tertiary-2-darker'],
    colors['tertiary-1'],
    colors['tertiary-1-lighter'],
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


function StackedBarChart({
  data,
  displayLegend,
  dataKeys,
  theme,
  xAxisDataKey,
  yTickFormatter,
  xTickFormatter,
  tooltip,
}) {
  const colorsPreset = useMemo(() => colorSet[theme].map((color) => ({ fill: color })), [theme]);

  function renderLegend() {
    return displayLegend ? <Legend verticalAlign="top" align="left" height={70} content={<HeaderLegend />} /> : null;
  }

  function renderStackedBars() {
    return (
      dataKeys.map((dataKey, index) => (
        <Bar
          stackId="one-stack"
          key={dataKey}
          type="monotone"
          dataKey={dataKey}
          {...colorsPreset[index]}
        />
      ))
    );
  }

  const areaChartMargin = displayLegend ? 0 : 30;

  return (
    <ResponsiveContainer className="chart-container">
      <RechartsBarChart data={data} margin={{ top: areaChartMargin }} barSize={16}>
        <XAxis
          dataKey={xAxisDataKey}
          axisLine
          tickSize={0}
          tick={<XAxisTick formatter={xTickFormatter} />}
          tickMargin={24}
          height={40}
        />
        <YAxis
          axisLine={false}
          tickSize={0}
          tick={<YAxisTick formatter={yTickFormatter} />}
        />
        <CartesianGrid vertical={false} strokeDasharray="2 2" />
        <RechartTooltip content={<Tooltip {...tooltip} />} />
        { renderLegend() }
        { renderStackedBars() }
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

StackedBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  displayLegend: PropTypes.bool,
  xAxisDataKey: PropTypes.string,
  dataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  yTickFormatter: PropTypes.func,
  xTickFormatter: PropTypes.func,
  theme: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  tooltip: ChartTooltipPropType,
};

StackedBarChart.defaultProps = {
  displayLegend: true,
  xAxisDataKey: 'name',
  yTickFormatter: null,
  xTickFormatter: null,
  theme: 'primary',
};

export default StackedBarChart;

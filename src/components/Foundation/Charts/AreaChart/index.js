import React from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart as RechartsAreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import HeaderLegend from '../Shared/HeaderLegend';
import XAxisTick from '../Shared/XAxisTick';
import YAxisTick from '../Shared/YAxisTick';
import { colors } from '../../Variables';
import Tooltip from '../Shared/Tooltip';
import { ChartTooltipPropType } from 'types/prop-types';

const colorsPreset = [
  { stroke: colors['tertiary-2'], fill: 'url(#tertiary-2-gradient)', fillOpacity: 1, strokeWidth: 2 },
  { stroke: colors.gray, fillOpacity: 0, strokeWidth: 2, strokeDasharray: '10 2' },
  { stroke: colors['gray-darker'], fillOpacity: 0, strokeWidth: 2, strokeDasharray: '10 2' },
];

function AreaChart({
  data,
  displayLegend,
  xAxisDataKey,
  dataKeys,
  yTickFormatter,
  xTickFormatter,
  tooltip,
  yAxisDomain,
}) {
  function renderLegend() {
    return displayLegend ? <Legend verticalAlign="top" align="left" height={70} content={<HeaderLegend />} /> : null;
  }

  function renderLines() {
    return (
      dataKeys.map((dataKey, index) => (
        <Area
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
      <RechartsAreaChart data={data} margin={{ top: areaChartMargin, left: 10 }}>
        <defs>
          <linearGradient id="tertiary-2-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.tertiary2} stopOpacity={0.2} />
            <stop offset="95%" stopColor={colors.tertiary2} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey={xAxisDataKey}
          axisLine
          tickSize={0}
          tick={<XAxisTick formatter={xTickFormatter} />}
          padding={{ left: 10, right: 10 }}
          tickMargin={24}
          height={40}
        />
        <YAxis
          axisLine={false}
          tickSize={0}
          domain={yAxisDomain}
          tick={<YAxisTick formatter={yTickFormatter} />}
        />
        <CartesianGrid vertical={false} strokeDasharray="2 2" />
        <RechartTooltip content={<Tooltip {...tooltip} />} />
        { renderLegend() }
        { renderLines() }
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}

AreaChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  displayLegend: PropTypes.bool,
  xAxisDataKey: PropTypes.string,
  dataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  yTickFormatter: PropTypes.func,
  xTickFormatter: PropTypes.func,
  tooltip: ChartTooltipPropType,
  yAxisDomain: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.number])),
};

AreaChart.defaultProps = {
  displayLegend: true,
  xAxisDataKey: 'name',
  yTickFormatter: null,
  xTickFormatter: null,
  yAxisDomain: [0, 'auto'],
};

export default AreaChart;

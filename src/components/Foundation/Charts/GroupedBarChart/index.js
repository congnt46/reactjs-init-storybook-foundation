import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  BarChart as RechartsBarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Cell,
  Tooltip as RechartTooltip,
} from 'recharts';

import XAxisTick from '../Shared/XAxisTick';
import YAxisTick from '../Shared/YAxisTick';
import HeaderLegend from '../Shared/HeaderLegend';
import { colors } from '../../Variables';
import Tooltip from '../Shared/Tooltip';
import { ChartTooltipPropType } from 'types/prop-types';

const colorSet = {
  primary: [
    colors['tertiary-2'],
    colors['gray-darker'],
    colors.gray,
  ],
};

function GroupedBarChart({
  data,
  displayLegend,
  dataKeys,
  theme,
  xAxisDataKey,
  yTickFormatter,
  xTickFormatter,
  onChange,
  tooltip,
}) {
  const colorsPreset = useMemo(() => colorSet[theme].map((color) => ({ fill: color })), [theme]);
  const [activeGroupIndex, setActiveGroupIndex] = useState(null);

  function renderLegend() {
    return displayLegend ? <Legend verticalAlign="top" align="left" height={70} content={<HeaderLegend />} /> : null;
  }

  function renderGroupedBars() {
    return (
      dataKeys.map((dataKey, index) => (
        <Bar
          key={dataKey}
          type="monotone"
          dataKey={dataKey}
          {...colorsPreset[index]}
        >
          {
            data.map((entry, groupIndex) => {
              let fillOpacity = 1;
              if (activeGroupIndex !== null) {
                fillOpacity = groupIndex === activeGroupIndex ? 1 : 0.4;
              }
              return <Cell cursor="pointer" fillOpacity={fillOpacity} key={`cell-${entry[xAxisDataKey]}`} />;
            })
          }
        </Bar>
      ))
    );
  }

  function handleClick(event) {
    let updatedIndex = null;
    if (event && activeGroupIndex !== event.activeTooltipIndex) {
      updatedIndex = event.activeTooltipIndex;
    }
    setActiveGroupIndex(updatedIndex);
    onChange(updatedIndex);
  }

  const areaChartMargin = displayLegend ? 0 : 30;

  return (
    <ResponsiveContainer className="chart-container">
      <RechartsBarChart data={data} margin={{ top: areaChartMargin }} barSize={10} onClick={handleClick}>
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
        { renderGroupedBars() }
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

GroupedBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  displayLegend: PropTypes.bool,
  xAxisDataKey: PropTypes.string,
  dataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  yTickFormatter: PropTypes.func,
  xTickFormatter: PropTypes.func,
  theme: PropTypes.oneOf(['primary', 'secondary']),
  onChange: PropTypes.func,
  tooltip: ChartTooltipPropType,
};

GroupedBarChart.defaultProps = {
  displayLegend: true,
  xAxisDataKey: 'name',
  yTickFormatter: null,
  xTickFormatter: null,
  theme: 'primary',
  onChange: (_) => _,
};

export default GroupedBarChart;

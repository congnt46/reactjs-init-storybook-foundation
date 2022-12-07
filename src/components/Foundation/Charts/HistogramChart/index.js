import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ComposedChart as RechartsComposedChart,
  Bar,
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend,
  Cell, Tooltip as RechartTooltip,
} from 'recharts';

import XAxisTick from '../Shared/XAxisTick';
import YAxisTick from '../Shared/YAxisTick';
import HeaderLegend from '../Shared/HeaderLegend';
import { colors } from '../../Variables';
import Tooltip from '../Shared/Tooltip';
import { ChartTooltipPropType } from 'types/prop-types';

const colorTheme = {
  primary: colors['tertiary-2'],
  secondary: colors['gray-dark'],
};

function SvgBar({ fill, x, y, width, height, barOffset }) {
  const clickableWidth = 7;
  return (
    <g>
      <path // Copy of Bar because ReferenceLine rewrite global bar shape
        width={width}
        height={height}
        x={x}
        y={y}
        cursor="pointer"
        fill={fill}
        radius="0"
        className="recharts-rectangle"
        d={`M ${x + barOffset},${y} h ${width} v ${height} h -${width} Z`}
      />
      <path // Copy of Bar because ReferenceLine rewrite global bar shape
        width={width + clickableWidth}
        height={y + height}
        x={x - (clickableWidth / 2)}
        y={0}
        cursor="pointer"
        fill="transparent"
        radius="0"
        className="recharts-rectangle"
        d={`M ${x - (clickableWidth / 2) + barOffset}, ${0} h ${width + clickableWidth} v ${y + height} h -${width + clickableWidth} Z`}
      />
    </g>
  );
}

SvgBar.propTypes = {
  fill: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  barOffset: PropTypes.string.isRequired,
};

function ReferenceLine({ x, label, color }) {
  const referenceLabelOffset = `-${label.length * 6}px`;
  const xCoord = x + 2;
  return (
    <>
      <line x1={xCoord} x2={xCoord} y1={0} y2="100%" strokeDasharray="1 1" stroke={color} />
      <text x={xCoord} y="100%" height="24" text-anchor="middle">
        <tspan className="text--semibold" dx={referenceLabelOffset} dy="-15px">{label}</tspan>
      </text>
    </>
  );
}

ReferenceLine.propTypes = {
  x: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

function HistogramChart({
  data,
  displayLegend,
  dataKey,
  xAxisDataKey,
  yTickFormatter,
  xTickFormatter,
  tickCount,
  ticks,
  theme,
  referenceLine,
  tooltip,
  type,
  barSize,
}) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  function renderLegend() {
    return displayLegend ? <Legend verticalAlign="top" align="left" height={70} content={<HeaderLegend />} /> : null;
  }

  function handleClick() {
    let index = null;
    if (activeIndex !== hoveredIndex) {
      index = hoveredIndex;
    }
    setActiveIndex(index);
  }

  const areaChartMarginTop = displayLegend ? 0 : 30;
  const areaChartMarginBottom = referenceLine ? 20 : 0;
  const barOffset = referenceLine ? 2 : 0.5;

  return (
    <ResponsiveContainer
      className="chart-container"
    >
      <RechartsComposedChart
        data={data}
        margin={{ top: areaChartMarginTop, bottom: areaChartMarginBottom }}
        barSize={barSize}
        gap="30%"
        barCategoryGap={2}
        onClick={handleClick}
      >
        <XAxis
          dataKey={xAxisDataKey}
          axisLine
          tickSize={0}
          tick={<XAxisTick formatter={xTickFormatter} />}
          tickMargin={24}
          height={40}
          type={type}
          padding={{ left: 20, right: 20 }}
          domain={[(min) => min, (max) => max]}
          tickCount={tickCount}
          ticks={ticks}
        />
        <YAxis
          axisLine={false}
          tickSize={0}
          tick={<YAxisTick formatter={yTickFormatter} />}
        />
        <CartesianGrid vertical={false} strokeDasharray="2 2" />
        <RechartTooltip content={<Tooltip {...tooltip} />} />
        { renderLegend() }
        <Bar
          dataKey={dataKey}
          data={data}
          fill={colorTheme[theme]}
          onMouseEnter={(value, index) => setHoveredIndex(index)}
          onMouseLeave={(value, index) => {
            if (index === hoveredIndex) {
              setHoveredIndex(null);
            }
          }}
          shape={(props) => SvgBar({ ...props, barOffset })}
        >
          {
            data.map((entry, index) => {
              let fill = colorTheme[theme];
              if (activeIndex !== null) {
                fill = index === activeIndex ? colors.tertiary2 : colors.gray;
              }
              return <Cell cursor="pointer" fill={fill} key={`cell-${entry[xAxisDataKey]}`} />;
            })
          }
        </Bar>
        {referenceLine && (
          <Bar
            data={[{ [xAxisDataKey]: referenceLine.value, [dataKey]: null }]} // Imitating ReferenceLine to show it full height
            shape={(props) => ReferenceLine({ ...props, color: colors.grayDarker, label: referenceLine.label })}
          />
        )}
      </RechartsComposedChart>
    </ResponsiveContainer>
  );
}

HistogramChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  displayLegend: PropTypes.bool,
  xAxisDataKey: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  yTickFormatter: PropTypes.func,
  xTickFormatter: PropTypes.func,
  ticks: PropTypes.arrayOf(PropTypes.any),
  tickCount: PropTypes.number,
  theme: PropTypes.oneOf('primary', 'secondary'),
  referenceLine: PropTypes.shape({ label: PropTypes.string, value: PropTypes.number }),
  tooltip: ChartTooltipPropType,
  type: PropTypes.oneOf(['number', 'category']),
  barSize: PropTypes.number,
};

HistogramChart.defaultProps = {
  displayLegend: false,
  xAxisDataKey: 'name',
  yTickFormatter: null,
  xTickFormatter: null,
  theme: 'primary',
  tickCount: 5,
  type: 'number',
  barSize: 4,
};

export default HistogramChart;

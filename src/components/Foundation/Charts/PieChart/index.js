import React from 'react';
import PropTypes from 'prop-types';
import {
  PieChart as RechartsPieChart,
  Tooltip as RechartTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import Tooltip from '../Shared/Tooltip';
import PieLegend from './PieLegend';
import renderPie from './Pie';
import { PieLegendPropType, ChartTooltipPropType } from 'types/prop-types';

const chartSize = {
  large: {
    innerRadius: 48,
    outerRadius: 65,
  },
  small: {
    innerRadius: 20,
    outerRadius: 29,
  },
};

function SubChart({ subData, theme, dataKey }) {
  return (
    <ResponsiveContainer>
      <RechartsPieChart data={subData}>
        { renderPie({ data: subData, dataKey, ...chartSize.small, theme }) }
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}

SubChart.propTypes = {
  subData: PropTypes.arrayOf(PropTypes.object).isRequired,
  theme: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
};

function PieChart({
  data,
  dataKey,
  displayLegend,
  tooltip,
  theme,
  legend,
}) {
  const subCharts = legend?.subCharts?.map(({ label: subLabel, data: subData }) => ({
    label: subLabel,
    content: <SubChart subData={subData} theme={theme} dataKey={dataKey} />,
  }));

  function renderLegend() {
    return displayLegend
      ? <Legend
        width="70%"
        height="100%"
        layout="vertical"
        verticalAlign="middle"
        align="right"
        content={({ payload }) => <PieLegend {...legend} payload={payload} subCharts={subCharts} />}
        />
      : null;
  }

  const areaChartMargin = displayLegend ? 0 : 30;

  return (
    <ResponsiveContainer className="chart-container">
      <RechartsPieChart data={data} margin={{ top: areaChartMargin }}>
        <RechartTooltip content={<Tooltip {...tooltip} />} />
        { renderLegend() }
        { renderPie({ data, dataKey, ...chartSize.large, theme }) }
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  displayLegend: PropTypes.bool,
  dataKey: PropTypes.string,
  tooltip: PropTypes.shape(ChartTooltipPropType),
  theme: PropTypes.string,
  legend: PropTypes.shape(PieLegendPropType),
};

PieChart.defaultProps = {
  displayLegend: true,
  dataKey: 'value',
  theme: 'primary',
};

export default PieChart;

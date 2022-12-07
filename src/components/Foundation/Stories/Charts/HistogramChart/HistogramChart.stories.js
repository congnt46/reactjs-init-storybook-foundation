import React from 'react';
import HistogramChart from 'components/Foundation/Charts/HistogramChart';
import { formatPrice } from 'utils/numberFormat';

const story = {
  title: 'Components/Charts/HistogramChart',
  component: HistogramChart,
};

const data = Array(56).fill(0).map((_, index) => ({
  count: (Math.random() * 10).toFixed(),
  cost: 200000 + (index * 25000),
}));

function Template(args) {
  return (
    <div className="d-flex" style={{ width: '730px', height: '400px' }}>
      <HistogramChart {...args} />
    </div>
  );
}

export const WithAutoXTicks = Template.bind({});
WithAutoXTicks.args = {
  data,
  xAxisDataKey: 'cost',
  dataKey: 'count',
  tickCount: 7,
  xTickFormatter: (value) => {
    const formatted = formatPrice(value);
    return `£${formatted ? formatted : '0'}`;
  },
};

export const WithManualXTicks = Template.bind({});
WithManualXTicks.args = {
  data,
  xAxisDataKey: 'cost',
  dataKey: 'count',
  ticks: [200000, 800000, 1600000],
  theme: 'secondary',
  xTickFormatter: (value) => {
    const formatted = formatPrice(value);
    return `£${formatted ? formatted : '0'}`;
  },
};

export const WithReferenceLine = Template.bind({});
WithReferenceLine.args = {
  data,
  xAxisDataKey: 'cost',
  dataKey: 'count',
  ticks: [200000, 800000, 1600000],
  theme: 'secondary',
  xTickFormatter: (value) => {
    const formatted = formatPrice(value);
    return `£${formatted ? formatted : '0'}`;
  },
  referenceLine: { label: 'Average', value: 1200000 },
};


export default story;

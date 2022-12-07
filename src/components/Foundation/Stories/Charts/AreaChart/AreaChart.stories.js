import React from 'react';
import AreaChart from 'components/Foundation/Charts/AreaChart';

const story = {
  title: 'Components/Charts/AreaChart',
  component: AreaChart,
};

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function Template(args) {
  return (
    <div className="d-flex" style={{ width: '730px', height: '400px' }}>
      <AreaChart {...args} />
    </div>
  );
}

export const Single = Template.bind({});
Single.args = {
  data,
  dataKeys: ['uv'],
  tooltip: {
    description: 'There is test tooltip description',
    valueFormatter: (value) => `£${value}`,
  },
};

export const LegendDisabled = Template.bind({});
LegendDisabled.args = {
  data,
  dataKeys: ['uv'],
  displayLegend: false,
};

export const Multiple = Template.bind({});
Multiple.args = {
  data,
  dataKeys: ['uv', 'pv', 'amt'],
};

export default story;

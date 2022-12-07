import React from 'react';
import GroupedBarChart from 'components/Foundation/Charts/GroupedBarChart';

const story = {
  title: 'Components/Charts/GroupedBarChart',
  component: GroupedBarChart,
};

const data = [
  {
    name: '2015',
    nw: 3.5,
    london: 1,
    uk: 2,
  },
  {
    name: '2016',
    nw: -1.5,
    london: -2,
    uk: -1,
  },
  {
    name: '2017',
    nw: 1.5,
    london: 1.3,
    uk: 2.2,
  },
  {
    name: '2018',
    nw: 4.5,
    london: 3,
    uk: 2,
  },
  {
    name: '2019',
    nw: 5.5,
    london: 4,
    uk: 4,
  },
  {
    name: '2020',
    nw: 3.5,
    london: 2,
    uk: 2,
  },
];

function Template(args) {
  return (
    <div className="d-flex" style={{ width: '730px', height: '400px' }}>
      <GroupedBarChart {...args} />
    </div>
  );
}

export const Primary = Template.bind({});
Primary.args = {
  data,
  dataKeys: ['nw', 'london', 'uk'],
  yTickFormatter: (value) => `${value > 0 ? '+' : '-'}${Math.abs(value)}%`,
};

export default story;

import React from 'react';
import StackedBarChart from 'components/Foundation/Charts/StackedBarChart';

const story = {
  title: 'Components/Charts/StackedBarChart',
  component: StackedBarChart,
};

const data = [
  {
    name: 'Page A',
    burglary: 50,
    theft: 100,
    violentCrime: 120,
    drugs: 30,
    pettyCrime: 130,
    other: 60,
  },
  {
    name: 'Page B',
    burglary: 50,
    theft: 100,
    violentCrime: 120,
    drugs: 30,
    pettyCrime: 130,
    other: 60,
  },
  {
    name: 'Page C',
    burglary: 50,
    theft: 100,
    violentCrime: 120,
    drugs: 30,
    pettyCrime: 130,
    other: 60,
  },
  {
    name: 'Page D',
    burglary: 50,
    theft: 100,
    violentCrime: 120,
    drugs: 30,
    pettyCrime: 130,
    other: 60,
  },
  {
    name: 'Page E',
    burglary: 50,
    theft: 100,
    violentCrime: 120,
    drugs: 30,
    pettyCrime: 130,
    other: 60,
  },
  {
    name: 'Page F',
    burglary: 50,
    theft: 100,
    violentCrime: 120,
    drugs: 30,
    pettyCrime: 130,
    other: 60,
  },
  {
    name: 'Page G',
    burglary: 50,
    theft: 100,
    violentCrime: 120,
    drugs: 30,
    pettyCrime: 130,
    other: 60,
  },
  {
    name: 'Page H',
    burglary: 50,
    theft: 100,
    violentCrime: 120,
    drugs: 30,
    pettyCrime: 130,
    other: 60,
  },
  {
    name: 'Page I',
    burglary: 50,
    theft: 100,
    violentCrime: 120,
    drugs: 30,
    pettyCrime: 130,
    other: 60,
  },
  {
    name: 'Page J',
    burglary: 50,
    theft: 100,
    violentCrime: 120,
    drugs: 30,
    pettyCrime: 130,
    other: 60,
  },
  {
    name: 'Page K',
    burglary: 50,
    theft: 100,
    violentCrime: 120,
    drugs: 30,
    pettyCrime: 130,
    other: 60,
  },
  {
    name: 'Page L',
    burglary: 50,
    theft: 100,
    violentCrime: 120,
    drugs: 30,
    pettyCrime: 130,
    other: 60,
  },
  {
    name: 'Page M',
    burglary: 50,
    theft: 100,
    violentCrime: 120,
    drugs: 30,
    pettyCrime: 130,
    other: 60,
  },
];

function Template(args) {
  return (
    <div className="d-flex" style={{ width: '730px', height: '400px' }}>
      <StackedBarChart {...args} />
    </div>
  );
}

export const Primary = Template.bind({});
Primary.args = {
  data,
  dataKeys: ['burglary', 'theft', 'violentCrime', 'drugs', 'pettyCrime', 'other'],
};

export default story;

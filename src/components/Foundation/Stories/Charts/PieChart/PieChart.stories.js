import React from 'react';
import PieChart from 'components/Foundation/Charts/PieChart';

const story = {
  title: 'Components/Charts/PieChart',
  component: PieChart,
};

const data = [
  {
    name: 'Flat',
    value: 50,
  },
  {
    name: 'Detached house',
    value: 100,
  },
  {
    name: 'Semi-detached house',
    value: 120,
  },
  {
    name: 'Terraced house',
    value: 30,
  },
  {
    name: 'End of terrace',
    value: 130,
  },
  {
    name: 'Town house',
    value: 60,
  },
  {
    name: 'Park home',
    value: 60,
  },
  {
    name: 'Bungalow',
    value: 60,
  },
  {
    name: 'Cottage',
    value: 60,
  },
  {
    name: 'Bungalow2',
    value: 60,
  },
  {
    name: 'Other',
    value: 60,
  },
];

const data2 = [
  {
    name: 'Sales/customer service, plan/machine, elementary occupations',
    value: 10,
  },
  {
    name: 'Administrative, skilled trade and service occupations',
    value: 30,
  },
  {
    name: 'Managerial, professional and technical occupations',
    value: 15,
  },
];

function Template(args) {
  return (
    <div className="d-flex" style={{ width: '640px', height: '233px' }}>
      <PieChart {...args} />
    </div>
  );
}

export const Primary = Template.bind({});
Primary.args = {
  data: data.slice(0, 6),
};

export const ManyItems = Template.bind({});
ManyItems.args = {
  data,
  theme: 'secondary',
};

export const LongLabels = Template.bind({});
LongLabels.args = {
  data: data2,
  theme: 'tertiary',
};

export const SubCharts = Template.bind({});
SubCharts.args = {
  data: data.slice(0, 3),
  legend: {
    label: 'NW3',
    subCharts: [
      {
        label: 'London',
        data: data.slice(0, 3),
      },
      {
        label: 'UK',
        data: data.slice(0, 3),
      },
    ],
  },
  theme: 'tertiary',
};

export default story;

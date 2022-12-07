import React from 'react';
import { toast } from 'react-toastify';

import { Table, Text, Button, Link, ToastContainer } from 'components/Foundation';

const story = {
  title: 'Components/Table',
  component: Table,
};

function Template(args) {
  return (
    <>
      <ToastContainer />
      <Table {...args} />
    </>
  );
}

function SampleFooter() {
  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex align-items-center">
        <Button size="small" type="alternative" disabled>Previous</Button>
        <Text small color="gray">Pagination component</Text>
        <Button size="small" type="alternative">Next</Button>
      </div>
      <div className="d-flex">
        <Text semibold color="gray">Showing 1-20 out of 40</Text>
      </div>
    </div>
  );
}

const basicColumnSample = [
  {
    heading: '#',
    dataKey: 'id',
    align: 'center',
  },
  {
    heading: 'Properties',
    dataKey: 'properties',
    align: 'center',
  },
  {
    heading: 'Name',
    dataKey: 'name',
  },
  {
    heading: 'Percentage',
    dataKey: 'percentage',
    align: 'right',
  },
];

const basicDataSample = [
  {
    id: 1,
    properties: 20,
    name: 'Default collections',
    percentage: '20%',
  },
  {
    id: 2,
    properties: 30,
    name: 'My collections',
    percentage: '40%',
  },
  {
    id: 3,
    properties: 50,
    name: 'Recent collections',
    percentage: '60%',
  },
];

export const Basic = Template.bind({});

Basic.args = {
  columns: basicColumnSample,
  data: basicDataSample,
};

export const WithFooter = Template.bind({});

WithFooter.args = {
  columns: basicColumnSample,
  data: basicDataSample,
  footer: SampleFooter,
};

export const CustomizedCellRender = Template.bind({});

function renderLink(dataItem) {
  return (
    <Link tag="button">{dataItem.name}</Link>
  );
}

function renderActionButtons(dataItem) {
  function handleClick() {
    toast(`Item: ${JSON.stringify(dataItem)}`, { type: 'info', closeButton: false });
  }
  return (
    <div className="d-flex justify-content-center">
      <Button type="alternative" size="small" onClick={handleClick}>Share</Button>
      <Button type="primary" size="small" onClick={handleClick}>Open</Button>
    </div>
  );
}

const customizesColumnSample = [
  {
    heading: '#',
    dataKey: 'id',
    align: 'center',
  },
  {
    heading: 'Properties',
    dataKey: 'properties',
    align: 'center',
  },
  {
    heading: 'Name',
    dataKey: 'name',
    render: renderLink,
  },
  {
    heading: 'Percentage',
    dataKey: 'percentage',
    align: 'right',
  },
  {
    heading: '',
    dataKey: 'actions',
    align: 'center',
    render: renderActionButtons,
  },
];

CustomizedCellRender.args = {
  columns: customizesColumnSample,
  data: basicDataSample,
};

export const WithCheckboxes = Template.bind({});

WithCheckboxes.args = {
  columns: basicColumnSample,
  data: basicDataSample,
  selectable: true,
  onSelectionChange(selections) {
    toast(`Selected indices: ${selections.toString()}`, { type: 'info', closeButton: false });
  },
};

export const WithSubheading = Template.bind({});
const subheadingColumnSample = [
  {
    heading: '',
    dataKey: 'id',
    align: 'center',
  },
  {
    heading: 'Properties',
    dataKey: 'properties',
    align: 'right',
    subheading: 'Average',
  },
  {
    heading: 'Name',
    dataKey: 'name',
  },
  {
    heading: 'Percentage',
    dataKey: 'percentage',
    align: 'right',
    subheading: 'Average',
  },
];
WithSubheading.args = {
  columns: subheadingColumnSample,
  data: basicDataSample,
};

export const WithSorter = Template.bind({});

WithSorter.args = {
  columns: [...subheadingColumnSample, {
    heading: 'Genie Area Score',
    dataKey: 'score',
    align: 'right',
    sorter: true,
  }],
  data: basicDataSample.map((item, index) => ({ ...item, score: 10 + (index * 3) })),
  onSorterChange(dataKey, direction) {
    toast(`Sort "${dataKey}"  : ${direction}`, {
      type: 'info',
      closeButton: false,
      position: toast.POSITION.TOP_CENTER,
    });
  },
};

export default story;

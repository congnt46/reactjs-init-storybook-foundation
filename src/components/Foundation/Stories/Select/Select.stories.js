import React from 'react';

import Select from 'components/Foundation/Select';
import './styles.scss';

const story = {
  title: 'Components/Select',
  component: Select,
};

function Template(args) {
  return (
    <div className="d-flex" style={{ width: '195px' }}>
      <Select className="story-select" {...args} />
    </div>
  );
}

export const Primary = Template.bind({});
Primary.args = {
  label: 'Any',
  options: [{
    label: 'test1',
    value: 'value1',
  }, {
    label: 'test2',
    value: 'value2',
  }, {
    label: 'test3',
    value: 'value3',
  }, {
    label: 'test4',
    value: 'value4',
  }, {
    label: 'test5',
    value: 'value5',
  }],
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  label: 'Any',
  multiple: true,
  options: [{
    label: 'Flat',
    value: 'flat',
  }, {
    label: 'House',
    value: 'house',
    children: [{
      label: 'Detached',
      value: 'detached',
    }, {
      label: 'Semi-detached',
      value: 'semi-detached',
    }, {
      label: 'Terraced',
      value: 'terraced',
    }],
  }, {
    label: 'Bungalow',
    value: 'bungalow',
  }],
};

export default story;

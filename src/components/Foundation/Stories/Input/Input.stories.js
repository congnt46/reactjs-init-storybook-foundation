import React from 'react';

import Input from 'components/Foundation/Input';
import './styles.scss';

const story = {
  title: 'Components/Input',
  component: Input,
};

function Template(args) {
  return (
    <div className="d-flex" style={{ width: '195px' }}>
      <Input className="story-input" {...args} />
    </div>
  );
}

export const Price = Template.bind({});
Price.args = {
  id: 'id',
  name: 'name',
  label: 'Price',
  placeholder: '1000',
  type: 'number',
  iconLeft: 'fa-gbp',
};

export default story;

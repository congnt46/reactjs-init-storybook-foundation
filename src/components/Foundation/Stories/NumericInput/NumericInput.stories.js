import React from 'react';

import NumericInput from 'components/Foundation/NumericInput';
import './styles.scss';

const story = {
  title: 'Components/NumericInput',
  component: NumericInput,
};

function Template(args) {
  return (
    <div className="d-flex" style={{ width: '300px' }}>
      <NumericInput className="story-input" {...args} />
    </div>
  );
}

export const Price = Template.bind({});
Price.args = {
  id: 'id',
  name: 'name',
  iconLeft: 'fa-gbp',
  inputCenter: false,
};

export default story;

import React from 'react';

import { Stars } from 'components/Foundation';

const story = {
  title: 'Components/Stars',
  component: Stars,
};

function Template(args) {
  return (
    <Stars {...args} />
  );
}

export const Default = Template.bind({});
Default.args = {
  value: 3.5,
  size: 'medium',
  transparent: false,
};

export const Transparent = Template.bind({});
Transparent.args = {
  value: 3.5,
  size: 'small',
};

export default story;

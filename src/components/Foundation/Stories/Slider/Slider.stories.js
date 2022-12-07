import React, { useState } from 'react';

import { Slider, Text } from 'components/Foundation';

const story = {
  title: 'Components/Slider',
  component: Slider,
};

function Default(args) {
  const [value, setValue] = useState();
  function handleChange(valueArray) {
    setValue(valueArray);
  }

  return (
    <div className="w-50 mt-3">
      <Slider {...args} onChange={handleChange} />
      <hr />
      <div className="mt-2">
        <Text>Min: {args.min ?? 0}</Text>
        <Text>Max: {args.max}</Text>
        <Text>Step: {args.step}</Text>
        <Text>Current value: {value?.join(' - ')}</Text>
      </div>
    </div>
  );
}

export const Basic = Default.bind({});

export const ShowValue = Default.bind({});
ShowValue.args = {
  showValue: true,
  value: [1, 20],
};

export const RangeSetting = Default.bind({});
RangeSetting.args = {
  min: 1000,
  max: 20000,
  showValue: true,
};

export const Step = Default.bind({});
Step.args = {
  min: 1000,
  max: 20000,
  step: 100,
  showValue: true,
};

export default story;

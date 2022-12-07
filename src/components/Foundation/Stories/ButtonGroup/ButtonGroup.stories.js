import React from 'react';

import { ButtonGroup, Icon, Text } from 'components/Foundation';

const story = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
};

function Default(args) {
  return (
    <ButtonGroup {...args}>
      <ButtonGroup.Item value="1">
        Option 1
      </ButtonGroup.Item>
      <ButtonGroup.Item value="2">
        Option 2
      </ButtonGroup.Item>
      <ButtonGroup.Item value="3">
        Option 3
      </ButtonGroup.Item>
    </ButtonGroup>
  );
}

export const Basic = Default.bind({});

export function Icons(args) {
  return (
    <>
      <ButtonGroup className="mb-4" {...args}>
        <ButtonGroup.Item value="asc">
          <Icon icon="fa-sort-amount-asc" />
        </ButtonGroup.Item>
        <ButtonGroup.Item value="desc">
          <Icon icon="fa-sort-amount-desc" />
        </ButtonGroup.Item>
      </ButtonGroup>
      <ButtonGroup {...args}>
        <ButtonGroup.Item value="asc">
          <Icon icon="fa-sort-amount-asc" />
          <Text>Option 1</Text>
        </ButtonGroup.Item>
        <ButtonGroup.Item value="desc">
          <Icon icon="fa-sort-amount-desc" />
          <Text>Option 2</Text>
        </ButtonGroup.Item>
      </ButtonGroup>
    </>
  );
}

export const DefaultValue = Icons.bind({});

DefaultValue.args = {
  value: 'asc',
};

export default story;

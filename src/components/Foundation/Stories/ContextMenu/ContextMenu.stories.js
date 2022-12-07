import React from 'react';

import { Button, ContextMenu } from 'components/Foundation';

const story = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
};

export function Default(args = {}) {
  return (
    <div className="d-flex" style={{ minHeight: 300 }}>
      <ContextMenu {...args}>
        <Button>Open menu</Button>
      </ContextMenu>
    </div>
  );
}

Default.args = {
  options: [
    { title: 'Option 1' },
    { title: 'Option 2' },
    { title: 'Option 3' },
  ],
};

export const WithSeparator = Default.bind({});

WithSeparator.args = {
  options: [
    { title: 'Option 1' },
    { title: 'Option 2', bottomSeparated: true },
    { title: 'Option 3' },
  ],
};

export const WithIcons = Default.bind({});

WithIcons.args = {
  options: [
    { title: 'Mark new properties as read', icon: 'fa-check-square' },
    { title: 'Open alert settings', icon: 'fa-cog' },
    { title: 'Close', icon: 'fa-close' },
  ],
};

export default story;

import React from 'react';
import { toast } from 'react-toastify';

import { Icon, ToastContainer } from 'components/Foundation';

const story = {
  title: 'Components/Icon',
  component: Icon,
};

function Default(args) {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex">
        <Icon icon="fa-home" {...args} size="small" />
        <Icon icon="fa-map-o" {...args} color="primary" size="small" />
        <Icon icon="fa-check" {...args} color="tertiary-1" size="small" />
        <Icon icon="fa-close" {...args} color="secondary" size="small" />
      </div>
      <div className="d-flex">
        <Icon icon="fa-home" {...args} />
        <Icon icon="fa-map-o" {...args} color="primary" />
        <Icon icon="fa-check" {...args} color="tertiary-1" />
        <Icon icon="fa-close" {...args} color="secondary" />
      </div>
      <div className="d-flex">
        <Icon icon="fa-home" {...args} size="large" />
        <Icon icon="fa-map-o" {...args} color="primary" size="large" />
        <Icon icon="fa-check" {...args} color="tertiary-1" size="large" />
        <Icon icon="fa-close" {...args} color="secondary" size="large" />
      </div>
      <div className="d-flex">
        <Icon icon="fa-home" {...args} size="larger" />
        <Icon icon="fa-map-o" {...args} color="primary" size="larger" />
        <Icon icon="fa-check" {...args} color="tertiary-1" size="larger" />
        <Icon icon="fa-close" {...args} color="secondary" size="larger" />
      </div>
    </div>
  );
}

export const Basic = Default.bind({});

Basic.args = {
  onClick: null,
};

export function Clickable(args) {
  return (
    <div className="d-flex">
      <ToastContainer />
      <Icon icon="fa-save" {...args} />
      <Icon icon="fa-trash-o" {...args} />
    </div>
  );
}

Clickable.args = {
  onClick() {
    toast('Clicked', {
      type: 'info',
      closeButton: false,
      position: toast.POSITION.TOP_CENTER,
    });
  },
};

export default story;

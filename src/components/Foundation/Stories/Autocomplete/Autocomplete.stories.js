import React from 'react';
import { toast } from 'react-toastify';

import { Autocomplete, ToastContainer } from 'components/Foundation';

const story = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
};

function Default(args) {
  return (
    <div className="w-50">
      <ToastContainer />
      <Autocomplete
        inputProps={{ id: 'autoSuggest', name: 'autoSuggest', ...args.inputProps }}
        {...args}
      />
    </div>
  );
}

export const Basic = Default.bind({});

Basic.args = {
  suggestions: [
    { title: 'Option 1' },
    { title: 'Option 2', description: 'This is a description' },
  ],
};

export const WithIcons = Default.bind({});

WithIcons.args = {
  suggestions: [
    { title: 'Option 1', icon: 'fa-home' },
    { title: 'Option 2', icon: 'fa-check', description: 'This is a description' },
  ],
};

export const ClearOnSelect = Default.bind({});

ClearOnSelect.args = {
  suggestions: [
    { title: 'Option 1', icon: 'fa-home' },
    { title: 'Option 2', icon: 'fa-check', description: 'This is a description' },
  ],
  clearOnSelect: true,
  inputProps: {
    placeholder: 'This input gets clear on selection',
  },
};


function handleSelect(index) {
  toast(`Selected index: ${index}`, {
    type: 'info',
    closeButton: false,
  });
}

export const WithHandler = Default.bind({});

WithHandler.args = {
  suggestions: [
    { title: 'Option 1' },
    { title: 'Option 2', description: 'This is a description' },
  ],
  onSelect: handleSelect,
};


export default story;

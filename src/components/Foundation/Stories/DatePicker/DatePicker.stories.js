import React from 'react';
import addYears from 'date-fns/addYears';

import DatePicker from 'components/Foundation/DatePicker';

const story = {
  title: 'Components/DatePicker',
  component: DatePicker,
};

function Template(args) {
  return (
    <div className="d-flex" style={{ width: '195px' }}>
      <DatePicker {...args} />
    </div>
  );
}

export const Default = Template.bind({});

Default.args = {
  id: 'default-calendar',
};

export const FutureOnlyCalendar = Template.bind({});

FutureOnlyCalendar.args = {
  id: 'future-calendar',
  minDate: new Date(),
  maxDate: addYears(new Date(), 10),
};

export const Disabled = Template.bind({});

Disabled.args = {
  id: 'disabled-calendar',
  disabled: true,
};

export const ReadOnly = Template.bind({});

ReadOnly.args = {
  id: 'readonly-calendar',
  readOnly: true,
};

export default story;

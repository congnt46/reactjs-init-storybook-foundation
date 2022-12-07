import React, { useMemo, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import PropTypes from 'prop-types';
import cx from 'classnames';
import enGb from 'date-fns/locale/en-GB';
import isToday from 'date-fns/isToday';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/fp/isSameDay';
import isSameMonth from 'date-fns/fp/isSameMonth';
import { getFormattedDate } from 'utils/dateFormatters';
import Input from '../Input';

import Header from './Header';

function DatePicker({ defaultValue, onChange, name, id, minDate, maxDate, ...rest }) {
  const datepickerRef = React.useRef();
  const [value, setValue] = useState(defaultValue);
  const [focusMonth, setFocusMonth] = useState(defaultValue);

  function handleChange(date) {
    setValue(date);
    if (onChange) {
      onChange(date);
    }
  }

  function handleMonthYearChange(date) {
    setFocusMonth(date);
  }

  function getDayClassname(date) {
    return cx('custom-datepicker__day', {
      'custom-datepicker__day--today': isToday(date),
      blurred: !isSameMonth(focusMonth, date),
      disabled: isBefore(date, minDate) || isBefore(maxDate, date),
      selected: isSameDay(date, value),
    });
  }

  function onClose() {
    return datepickerRef?.current?.setOpen(false);
  }

  const years = useMemo(() => {
    const range = [];
    let minYear = minDate.getFullYear();
    const maxYear = maxDate.getFullYear();
    while (minYear <= maxYear) {
      range.push(minYear);
      minYear += 1;
    }
    return range;
  }, [minDate, maxDate]);

  function renderCustomHeader(props) {
    return <Header {...props} onClose={onClose} years={years} />;
  }

  return (
    <div>
      <ReactDatePicker
        id={id}
        name={name}
        locale="en-GB"
        useWeekdaysShort
        onChange={handleChange}
        onMonthChange={handleMonthYearChange}
        onYearChange={handleMonthYearChange}
        selected={value}
        customInput={<Input name={name} id={id} iconLeft="fa-calendar-o" />}
        showPopperArrow={false}
        portalId="root"
        value={value && getFormattedDate(value)}
        calendarClassName="custom-datepicker"
        renderCustomHeader={renderCustomHeader}
        weekDayClassName={() => 'custom-datepicker__weekday'}
        dayClassName={getDayClassname}
        popperClassName="custom-datepicker-popper"
        ref={datepickerRef}
        minDate={minDate}
        maxDate={maxDate}
        {...rest}
      />
    </div>
  );
}

DatePicker.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  shouldCloseOnSelect: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
};

DatePicker.defaultProps = {
  onChange: null,
  defaultValue: null,
  minDate: new Date(1970, 1, 1),
  maxDate: new Date(),
  disabled: false,
  readOnly: false,
  required: false,
  shouldCloseOnSelect: true,
  name: '',
  id: '',
};

registerLocale('en-GB', enGb);

export default DatePicker;

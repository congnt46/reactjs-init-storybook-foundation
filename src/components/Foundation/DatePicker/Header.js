import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

import Select from '../Select';
import Icon from '../Icon';
import Title from '../Title';

import MONTHS from './months';

function Header({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  onClose,
  years,
}) {

  function onMonthChanged(option) {
    changeMonth(MONTHS.indexOf(option));
  }

  function onYearChanged(option) {
    changeYear(option);
  }

  const monthList = useMemo(() => {
    return MONTHS.map((month) => ({ label: month, value: month }));
  }, []);

  const yearList = useMemo(() => {
    return years.map((year) => ({ label: year, value: year }));
  }, [years]);

  return (
    <div className="custom-datepicker__header">
      <div className="custom-datepicker__selections">
        <Select
          label={MONTHS[date.getMonth()]}
          options={monthList}
          onChange={onMonthChanged}
          size="small"
          className="d-flex flex-grow-1"
        />
        <Select
          label={date.getFullYear()}
          options={yearList}
          onChange={onYearChanged}
          size="small"
          className="custom-datepicker__years"
        />
        <Icon icon="fa-close" size="large" onClick={onClose} />
      </div>
      <div className="custom-datepicker__navigation">
        <Icon size="small" icon="fa-chevron-left" onClick={decreaseMonth} />
        <Title tag="p" size={18} font="bold">{format(date, 'LLLL yyyy')}</Title>
        <Icon size="small" icon="fa-chevron-right" onClick={increaseMonth} />
      </div>
    </div>
  );
}

Header.propTypes = {
  date: PropTypes.instanceOf(Date),
  years: PropTypes.arrayOf(PropTypes.number),
  changeYear: PropTypes.func.isRequired,
  changeMonth: PropTypes.func.isRequired,
  decreaseMonth: PropTypes.func.isRequired,
  increaseMonth: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

Header.defaultProps = {
  date: new Date(),
};

export default Header;

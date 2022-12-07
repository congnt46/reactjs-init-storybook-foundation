import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

function TableSorter({ direction, onChange }) {
  const [sortDirection, setSortDirection] = useState(direction);

  useEffect(() => {
    if (onChange) {
      onChange(sortDirection);
    }
  }, [onChange, sortDirection]);

  function getIconColor(currentDirection) {
    return currentDirection === sortDirection ? 'tertiary-2' : 'gray';
  }

  function handleChangeDirection() {
    setSortDirection((prevState) => {
      if (prevState === 'asc') {
        return 'desc';
      }
      if (prevState === 'desc') {
        return 'none';
      }
      return 'asc';
    });
  }

  return (
    <div className="table__sorter" onClick={handleChangeDirection} onKeyDown={handleChangeDirection}>
      <Icon icon="fa-caret-up" color={getIconColor('asc')} />
      <Icon icon="fa-caret-down" color={getIconColor('desc')} />
    </div>
  );
}

TableSorter.propTypes = {
  direction: PropTypes.oneOf(['none', 'asc', 'desc']),
  onChange: PropTypes.func,
};

TableSorter.defaultProps = {
  direction: 'none',
  onChange: null,
};

export default TableSorter;

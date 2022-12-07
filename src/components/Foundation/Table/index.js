import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import TableHead, { ColumnsPropType } from './TableHead';
import TableBody from './TableBody';
import TableFooter from './TableFooter';

function Table({ columns, data, footer, selectable, onSelectionChange, onSorterChange, className }) {
  const [selections, setSelections] = useState([]);

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selections);
    }
  }, [onSelectionChange, selections]);

  const handleSelectRow = useCallback((value) => {
    if (value === 'cell-checkbox-all') {
      return setSelections((prevState) => {
        if (prevState.length === data.length) {
          return [];
        }
        return Array.from({ length: data.length }, (item, key) => key);
      });
    }
    setSelections((prevState) => {
      if (!prevState.includes(value)) {
        return [...prevState, value];
      }
      return prevState.filter((item) => item !== value);
    });
  }, [data.length]);

  return (
    <div className={cx('table-container', className)}>
      <table className="table">
        <TableHead
          columns={columns}
          selectable={selectable}
          allSelected={selections.length === data.length}
          onSelect={handleSelectRow}
          onSort={onSorterChange}
        />
        <TableBody
          data={data}
          columns={columns}
          selectable={selectable}
          onSelect={handleSelectRow}
          selections={selections}
        />
        {footer && <TableFooter colSpan={columns.length}>{footer()}</TableFooter>}
      </table>
    </div>
  );
}

Table.propTypes = {
  columns: ColumnsPropType.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  footer: PropTypes.func,
  selectable: PropTypes.bool,
  onSelectionChange: PropTypes.func,
  onSorterChange: PropTypes.func,
  className: PropTypes.string,
};

Table.defaultProps = {
  footer: null,
  selectable: false,
  onSelectionChange: null,
  onSorterChange: null,
  className: '',
};

export default Table;

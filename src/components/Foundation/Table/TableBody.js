import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ColumnsPropType } from './TableHead';

import TableRow from './TableRow';
import TableCell from './TableCell';
import TableCheckbox from './TableCheckbox';

function TableBody({ data, columns, selectable, onSelect, selections }) {
  function renderRowCells(rowData) {
    return (
      <>
        {columns.map((column) => {
          const CustomCell = column.render;
          const cellContent = CustomCell ? <CustomCell {...rowData} /> : rowData[column.dataKey];

          return (
            <TableCell
              key={column.dataKey}
              align={column.align}
              className={cx({ 'table__cell--highlight': column.highlight })}
            >
              { cellContent }
            </TableCell>
          );
        })}
      </>
    );
  }
  return (
    <tbody className="table__body">
      {data.map((item, index) => (
        <TableRow key={index.toString()}>
          {selectable && (
            <TableCheckbox
              onChange={onSelect}
              value={index}
              checked={selections.includes(index)}
            />
          )}
          {renderRowCells(item)}
        </TableRow>
    ))}
    </tbody>
  );
}

TableBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: ColumnsPropType.isRequired,
  selectable: PropTypes.bool,
  onSelect: PropTypes.func,
  selections: PropTypes.arrayOf(PropTypes.number),
};

TableBody.defaultProps = {
  selectable: false,
  onSelect: null,
  selections: [],
};

export default TableBody;

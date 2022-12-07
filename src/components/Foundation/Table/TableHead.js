import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import TableCheckbox from './TableCheckbox';
import TableCell from './TableCell';
import TableSorter from './TableSorter';
import TableRow from './TableRow';

import Title from '../Title';
import Text from '../Text';

function TableHead({ columns, selectable, onSelect, allSelected, onSort }) {
  const { t } = useTranslation();
  const handleSortChange = useCallback((key, direction) => {
    if (onSort) {
      onSort(key, direction);
    }
  }, [onSort]);

  const tableHeadCells = useMemo(() => {
    return (
      <>
        {columns.map((column, index) => {
          const classes = cx('table__heading', {
            'table__heading--sub': Boolean(column.subheading),
            'table__heading--sorter': Boolean(column.sorter),
            'table__cell--highlight': column.highlight,
            'table__cell--fit-content': column.fitContent,
          });
          const textClasses = `text-${column.align ?? 'left'}`;
          const headingComponent = typeof column.heading === 'string' ? <Title tag="p" size={15} className={textClasses}>{t(column.heading)}</Title> : column.heading;
          return (
            <TableCell key={index.toString()} className={classes} tag="th">
              {headingComponent}
              {column.subheading && <Text className={textClasses} small semibold color="gray">{t(column.subheading)}</Text>}
              {column.sorter && <TableSorter onChange={(direction) => handleSortChange(column.dataKey, direction)} />}
            </TableCell>
          );
        })}
      </>
    );
  }, [columns, handleSortChange, t]);

  return (
    <thead className="table__head">
      <TableRow>
        {selectable && (
          <TableCheckbox
            checked={allSelected}
            onChange={onSelect}
            value="cell-checkbox-all"
          />
        )}
        {tableHeadCells}
      </TableRow>
    </thead>
  );
}

export const ColumnsPropType = PropTypes.arrayOf(PropTypes.shape({
  heading: PropTypes.node,
  subheading: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  render: PropTypes.func,
  sorter: PropTypes.bool,
  highlight: PropTypes.bool,
  fitContent: PropTypes.bool,
}));

TableHead.propTypes = {
  columns: ColumnsPropType.isRequired,
  selectable: PropTypes.bool,
  allSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  onSort: PropTypes.func,
};

TableHead.defaultProps = {
  selectable: false,
  allSelected: false,
  onSelect: null,
  onSort: null,
};

export default TableHead;

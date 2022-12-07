import React from 'react';
import PropTypes from 'prop-types';

import { ChildrenPropType } from 'types/prop-types';
import TableRow from './TableRow';
import TableCell from './TableCell';

function TableFooter({ children, colSpan }) {
  return (
    <tfoot className="table__footer">
      <TableRow>
        <TableCell colSpan={colSpan}>{children}</TableCell>
      </TableRow>
    </tfoot>
  );
}

TableFooter.propTypes = {
  children: ChildrenPropType.isRequired,
  colSpan: PropTypes.number.isRequired,
};

export default TableFooter;

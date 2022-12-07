import React from 'react';

import { ChildrenPropType } from 'types/prop-types';

function TableRow({ children }) {
  return (
    <tr className="table__row">
      {children}
    </tr>
  );
}

TableRow.propTypes = {
  children: ChildrenPropType,
};

export default TableRow;

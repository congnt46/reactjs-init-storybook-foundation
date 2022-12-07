import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '../Checkbox';
import TableCell from './TableCell';

function TableCheckbox(props) {

  return (
    <TableCell className="table__checkbox">
      <div className="d-flex justify-content-center align-items-center">
        <Checkbox className="mb-0" {...props} />
      </div>
    </TableCell>
  );
}

TableCheckbox.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default TableCheckbox;

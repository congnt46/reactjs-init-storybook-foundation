import React from 'react';
import PropTypes from 'prop-types';

import { ChildrenPropType } from 'types/prop-types';

import Text from '../Text';

function TableCell({ children, align, colSpan, className, tag: Tag }) {
  function renderCellContent() {
    if (['string', 'number'].includes(typeof children)) {
      return <Text className={`text-${align}`}>{children}</Text>;
    }
    return children;
  }

  return (
    <Tag colSpan={colSpan} className={`table__cell ${className}`}>{renderCellContent()}</Tag>
  );
}

TableCell.propTypes = {
  children: ChildrenPropType,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  colSpan: PropTypes.number,
  className: PropTypes.string,
  tag: PropTypes.string,
};

TableCell.defaultProps = {
  align: 'left',
  children: null,
  colSpan: null,
  className: '',
  tag: 'td',
};

export default TableCell;

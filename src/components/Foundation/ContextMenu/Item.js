import React from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';
import Icon from '../Icon';

function Item({ title, icon, onClick, bottomSeparated, onClose }) {
  function handleClick() {
    onClose();
    return onClick?.();
  }

  return (
    <>
      <button type="button" className="context-menu__item" onClick={handleClick}>
        {icon && <Icon icon={icon} color="gray-dark" className="context-menu__icon" />}
        <Text semibold color="gray-dark">{title}</Text>
      </button>
      {bottomSeparated && <hr className="context-menu__separator" />}
    </>
  );
}

Item.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  bottomSeparated: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

Item.defaultProps = {
  icon: null,
  onClick: null,
  bottomSeparated: false,
};

export default Item;

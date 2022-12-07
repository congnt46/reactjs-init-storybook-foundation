import React from 'react';
import PropTypes from 'prop-types';

import Title from '../Title';
import Icon from '../Icon';

function Header({ title, onClose }) {
  function renderTitle() {
    if (typeof title === 'string') {
      return (
        <Title size={20} font="bold">{title}</Title>
      );
    }
    return title;
  }

  return (
    <div className="modal__header">
      {renderTitle()}
      <Icon size="large" icon="fa-close" onClick={onClose} color="gray-dark" />
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.node.isRequired,
  onClose: PropTypes.func,
};

export default Header;

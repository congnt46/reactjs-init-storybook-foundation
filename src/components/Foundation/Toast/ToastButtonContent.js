import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import Text from '../Text';

function ToastButtonContent({ text, button, color }) {
  return (
    <div className="d-flex align-items-center">
      <Text semibold color={color}>{text}</Text>
      <Button type={button.type} size="small" className="toast__btn" onClick={button.onClick}>{button.title}</Button>
    </div>
  );
}

ToastButtonContent.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  button: PropTypes.shape({
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['alternative', 'primary', 'success', 'error']),
  }).isRequired,
};

export default ToastButtonContent;

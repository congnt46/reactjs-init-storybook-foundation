import React from 'react';
import { ToastContainer as Container } from 'react-toastify';
import PropTypes from 'prop-types';

import Icon from '../Icon';

function ToastContainer() {
  return (
    <Container
      hideProgressBar
      closeButton={CloseButton}
    />
  );
}

function CloseButton({ closeToast }) {
  return <Icon icon="fa-close" color="gray-dark" className="toast__close-btn" onClick={closeToast} />;
}

CloseButton.propTypes = {
  closeToast: PropTypes.func.isRequired,
};

export default ToastContainer;

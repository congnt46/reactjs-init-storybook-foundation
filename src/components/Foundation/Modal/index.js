import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ChildrenPropType, SizePropType } from 'types/prop-types';

import Dialog from './Dialog';

const Modal = React.forwardRef(ModalWithRef);

function ModalWithRef({ onClose, open, disableBackdropClick, containerClassName, ...rest }, ref) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
    if (open) {
      document.getElementById('root').classList.add('overflow-hidden');
    } else {
      document.getElementById('root').classList.remove('overflow-hidden');
    }
  }, [open]);

  function handleClose() {
    setIsOpen(false);
    return onClose?.();
  }

  function handleBackdropClick() {
    if (disableBackdropClick) {
      return;
    }
    handleClose();
  }

  const containerClasses = cx('modal-container', {
    open: isOpen,
    disabled: disableBackdropClick,
  }, containerClassName);

  return (
    <div ref={ref} className={containerClasses} onClick={handleBackdropClick} aria-hidden>
      <Dialog onClose={handleClose} {...rest} />
    </div>
  );
}

ModalWithRef.propTypes = {
  children: ChildrenPropType.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  size: SizePropType,
  title: PropTypes.node.isRequired,
  renderFooter: PropTypes.func,
  disableBackdropClick: PropTypes.bool,
  hideFooter: PropTypes.bool,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

ModalWithRef.defaultProps = {
  open: false,
  onClose: null,
  disableBackdropClick: false,
  hideFooter: false,
  renderFooter: null,
  containerClassName: null,
  className: null,
  size: 'medium',
};

export default Modal;

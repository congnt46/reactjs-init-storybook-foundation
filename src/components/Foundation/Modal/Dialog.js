import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ChildrenPropType, SizePropType } from 'types/prop-types';

import Header from './Header';
import Footer from './Footer';

function Dialog({ children, size, title, renderFooter, onClose, className, hideFooter }) {
  const classes = cx('modal', `modal--${size}`, className);

  function handleInsideClick(event) {
    event.stopPropagation();
  }

  return (
    <div className={classes} onClick={handleInsideClick} aria-hidden>
      <Header onClose={onClose} title={title} />
      <div className="modal__body">
        {children}
      </div>
      {!hideFooter && (
        <Footer>{renderFooter?.({ onClose })}</Footer>
      )}
    </div>
  );
}

Dialog.propTypes = {
  children: ChildrenPropType.isRequired,
  size: SizePropType,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  renderFooter: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
  hideFooter: PropTypes.bool,
};

export default Dialog;

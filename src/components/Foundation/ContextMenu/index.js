import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ChildrenPropType } from 'types/prop-types';
import { useOnClickOutside } from 'hooks';

import Item from './Item';

function ContextMenu({ children, options, className }) {
  const triggerRef = useRef();
  const contextMenuRef = useRef();
  const [open, setOpen] = useState(false);
  const classes = cx('context-menu', { open });

  function toggleMenu() {
    setOpen((prevState) => !prevState);
  }

  function handleClose() {
    setOpen(false);
  }

  useOnClickOutside([contextMenuRef, triggerRef], () => {
    setOpen(false);
  });

  const triggerRect = triggerRef?.current?.getBoundingClientRect() ?? null;
  const popupRect = contextMenuRef?.current?.getBoundingClientRect() ?? { width: 0, height: 0 };
  const offsetX = triggerRect ? window.innerWidth - triggerRect.right : 0;
  const offsetY = triggerRect ? window.innerHeight - triggerRect.bottom : 0;

  const popupStyles = {
    [offsetX > popupRect.width ? 'left' : 'right']: 0,
    [offsetY > popupRect.height ? 'top' : 'bottom']: 0 + (triggerRect?.height ?? 0),
  };

  return (
    <div className={`context-menu-container ${className}`}>
      <div className="context-menu-trigger" ref={triggerRef} onClick={toggleMenu} aria-hidden>
        {children}
      </div>
      {triggerRef &&
        <div className={classes} ref={contextMenuRef} style={popupStyles}>
          {options.map((option, index) => (
            <Item key={index.toString()} {...option} onClose={handleClose} />
          ))}
        </div>
      }
    </div>
  );
}

ContextMenu.propTypes = {
  children: ChildrenPropType.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    onClick: PropTypes.func,
    bottomSeparated: PropTypes.bool,
  })).isRequired,
  className: PropTypes.string,
};

ContextMenu.defaultProps = {
  className: '',
};

export default ContextMenu;

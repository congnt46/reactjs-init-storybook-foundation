import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import SizePropType from 'types/prop-types/SizePropType';

import Icon from '../Icon';

function ButtonIcon({ icon, size, className = '' }) {
  return <span className={className}><Icon size={size} icon={icon} /></span>;
}

ButtonIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: SizePropType,
};

function Button({ children, type, size, onClick, iconLeft, iconRight, disabled, className, tag: Tag, elementGrow, rounded }) {
  const classes = cx('text-uppercase btn', `btn-${type} btn--${size}`, {
    'btn--full': Tag === 'div',
    disabled,
    'btn--round': rounded,
  }, className);
  const textClasses = cx({
    'd-flex flex-grow-1 justify-content-center': elementGrow === 'text',
  });
  const iconLeftClasses = cx('btn-icon btn-icon--left', {
    'd-flex flex-grow-1': elementGrow === 'iconLeft',
  });
  const iconRightClasses = cx('btn-icon btn-icon--right', {
    'd-flex flex-grow-1 justify-content-end': elementGrow === 'iconRight',
  });
  return (
    <Tag className={classes} disabled={disabled} onClick={onClick}>
      {iconLeft && <ButtonIcon size={size} className={iconLeftClasses} icon={iconLeft} />}
      <div className={textClasses}>{children}</div>
      {iconRight && <ButtonIcon size={size} className={iconRightClasses} icon={iconRight} />}
    </Tag>
  );
}

Button.propTypes = {
  tag: PropTypes.oneOf(['button', 'div']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['alternative', 'primary', 'success', 'error']),
  className: PropTypes.string,
  elementGrow: PropTypes.oneOf(['text', 'iconLeft', 'iconRight']),
  size: SizePropType,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  rounded: PropTypes.bool,
};

Button.defaultProps = {
  tag: 'button',
  type: 'primary',
  size: 'medium',
  className: '',
  rounded: false,
};

export default Button;

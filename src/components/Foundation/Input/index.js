import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Link from '../Link';
import Icon from '../Icon';

function InputIcon({ icon, size, className = '', onClick = null }) {
  return <span className={className} onClick={onClick} onKeyDown={onClick}><Icon icon={icon} size={size} /></span>;
}

InputIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium']).isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

const Input = React.forwardRef((props, ref) => {
  const {
    size,
    className,
    label: labelText,
    multiline,
    id,
    error,
    extraAction,
    caption,
    iconLeft,
    iconRight,
    onClickIconRight,
    ...rest
  } = props;

  const classes = cx('input', {
    [`input--${size}`]: true,
    'input--error': Boolean(error),
  }, className);
  const inputClasses = cx('input__field', {
    'input__field--error': Boolean(error),
    'icon--prefix': Boolean(iconLeft),
    'icon--suffix': Boolean(iconRight),
    'input--omit-height': Boolean(multiline),
  });
  const iconRightClasses = cx('input__icon input__icon--right', {
    'input__icon--clickable': Boolean(onClickIconRight),
  });
  const iconSize = size === 'small' ? 'small' : 'medium';

  const principalContainer = multiline
    ? <textarea id={id} ref={ref} className={inputClasses} {...rest} />
    : <input id={id} ref={ref} className={inputClasses} {...rest} />;

  function renderLeftComponent() {
    if (!iconLeft) {
      return null;
    }
    if (typeof iconLeft === 'string') {
      return <InputIcon icon={iconLeft} size={iconSize} className="input__icon input__icon--left" />;
    }
    return iconLeft;
  }

  return (
    <div className={classes}>
      {(labelText || extraAction) && (
        <div className="input__heading">
          {labelText && <label htmlFor={id} className="input__label">{labelText}</label>}
          {extraAction && <Link onClick={extraAction.callback} tag="button">{extraAction.name}</Link>}
        </div>
      )}
      <div className="input__field-wrapper">
        {renderLeftComponent()}

        {principalContainer}

        {iconRight && <InputIcon icon={iconRight} size={iconSize} onClick={onClickIconRight} className={iconRightClasses} />}
      </div>
      { (error !== null || caption !== null) && <p className="input__caption">{(error || (typeof caption === 'function' ? caption() : caption))}</p> }
    </div>
  );
});

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  multiline: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number', 'password']),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  caption: PropTypes.string,
  className: PropTypes.string,
  extraAction: PropTypes.shape({ name: PropTypes.string, callback: PropTypes.func }),
  iconLeft: PropTypes.node,
  iconRight: PropTypes.string,
  onClickIconRight: PropTypes.func,
};

Input.defaultProps = {
  size: 'medium',
  type: 'text',
  className: '',
  label: null,
  multiline: false,
  caption: null,
  error: null,
  extraAction: null,
  onClickIconRight: null,
};

export default Input;

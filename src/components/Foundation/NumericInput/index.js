import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Button from '../Button';
import Icon from '../Icon';
import Text from '../Text';
import Input from '../Input';
import { formatNumberWithCommas, parseIntWithCommas } from 'utils/numberFormat';
import { debounce } from 'lodash';

NumericInput.propTypes = {
  stepper: PropTypes.bool,
  prefix: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
  inputCenter: PropTypes.bool,
  placeholder: PropTypes.string,
  wait: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  value: PropTypes.number,
};

NumericInput.defaultProps = {
  stepper: false,
  prefix: null,
  className: '',
  onChange: null,
  inputCenter: true,
  wait: 0,
  size: 'small',
};

function NumericInput({
  stepper,
  className,
  defaultValue,
  onChange,
  prefix,
  inputCenter,
  placeholder,
  wait,
  value: propValue,
  ...props
}) {
  const prefixRef = React.useRef();
  const [value, setValue] = useState(defaultValue);
  const onChangeDebounced = useMemo(() => debounce(onChange, wait), [onChange, wait]);

  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  function handleIncrement() {
    setValue((prevState) => prevState + 1);
  }

  function handleDecrement() {
    setValue((prevState) => prevState - 1);
  }

  function onValueChange(event) {
    const parsedValue = parseIntWithCommas(event.target.value);
    if (parsedValue !== null) {
      setValue(parsedValue);
      if (onChange) {
        onChangeDebounced.cancel();
        onChangeDebounced(parsedValue);
      }
    }
  }

  const classes = cx('numeric-input__field', {
    'numeric-input__field--prefixed': Boolean(prefix),
    'numeric-input_center': inputCenter,
  });

  const prefixComponent = prefix ? (
    <div ref={prefixRef} className="numeric-input__prefix"><Text semibold>{prefix}</Text></div>
  ) : null;

  const inputPlaceholder = useMemo(() => (typeof placeholder === 'number'
    ? formatNumberWithCommas(placeholder)
    : placeholder)
    , [placeholder]);

  return (
    <div className={`numeric-input ${className}`}>
      {stepper && (
        <Button
          className="numeric-input__stepper"
          type="alternative"
          active size="small"
          rounded
          onClick={handleDecrement}
        >
          <Icon icon="fa-minus" size="small" />
        </Button>
      )}
      <div className={classes}>
        <Input
          style={{ paddingLeft: prefixRef?.current?.clientWidth }}
          type="text"
          value={formatNumberWithCommas(value)}
          placeholder={inputPlaceholder}
          onChange={onValueChange}
          iconLeft={prefixComponent}
          {...props}
        />
      </div>
      {stepper && (
        <Button
          className="numeric-input__stepper"
          type="alternative"
          active size="small"
          rounded
          onClick={handleIncrement}
        >
          <Icon icon="fa-plus" size="small" />
        </Button>
      )}
    </div>
  );
}

export default NumericInput;

import React, { useEffect, useState } from 'react';
import { Range } from 'rc-slider';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { formatNumberWithCommas } from 'utils/numberFormat';

import Text from '../Text';

function Slider({ onChange, showValue, value, className, ...rest }) {
  const [values, setValues] = useState();

  useEffect(() => {
    setValues(value);
  }, [value]);

  function handleChange(newValues) {
    setValues(newValues);
    return onChange?.(newValues);
  }

  const classes = cx('slider-container', className);

  return (
    <div className={classes}>
      <Range
        value={values}
        onChange={handleChange}
        {...rest}
      />
      {showValue && (
        <div className="d-flex justify-content-between">
          {values && (
            <>
              <Text small color="gray">{formatNumberWithCommas(values[0])}</Text>
              <Text small color="gray">{formatNumberWithCommas(values[1])}</Text>
            </>
          )}
        </div>
      )}
    </div>
  );
}

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
  showValue: PropTypes.bool,
  className: PropTypes.string,
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  onChange: null,
  showValue: false,
  className: null,
};

export default Slider;

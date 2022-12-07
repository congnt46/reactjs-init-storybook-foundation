import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from '../Icon';
import Text from '../Text';

function Option({ option, onSelect, selected, multiple, level }) {
  const classes = cx('option', { selected, multiple, nested: level > 0 });
  const checkboxIcon = selected ? 'fa-check-square' : 'fa-square-o';

  return (
    <button
      className={classes}
      onClick={onSelect(option)}
      onKeyDown={onSelect(option)}
      type="button"
    >
      {multiple && (
        <Icon className="option__multi-checkbox-icon" icon={checkboxIcon} />
      )}
      {option.icon && <Icon className="option__icon" icon={option.icon} size="small" />}
      <Text>{option.label}</Text>
      {option.hint && <Text className="option__hint">{option.hint}</Text>}
    </button>
  );
}

export const OptionType = PropTypes.shape({
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  hint: PropTypes.string,
});

Option.propTypes = {
  option: OptionType.isRequired,
  selected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  level: PropTypes.number,
};

Option.defaultProps = {
  selected: false,
  multiple: false,
  level: 0,
};

export default Option;


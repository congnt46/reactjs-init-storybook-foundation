import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { SizePropType } from 'types/prop-types';
import useOnClickOutside from 'hooks/useOnClickOutside';

import Text from '../Text';
import Icon from '../Icon';
import Button from '../Button';

import Option, { OptionType } from './Option';
import { useMultiOptions } from './utils';
import { useTranslation } from 'react-i18next';
import ModalPortal from 'components/Foundation/ModalPortal';

function Select({
  icon,
  disabled,
  error,
  label,
  onChange,
  options,
  size,
  className,
  multiple,
  onSubmit,
  defaultValue,
  value,
  inline,
}) {
  const { t } = useTranslation();
  const selectRef = useRef();
  const optionsRef = useRef();
  const [active, setActive] = useState(false);
  const [selection, setSelection] = useState(defaultValue);
  const isSelected = useCallback((option) => selection === option.value, [selection]);

  useEffect(() => {
    setSelection(value);
  }, [value]);

  const {
    toggleOption,
    flatOptions,
    formatMultiSelection,
    isMultiSelected,
  } = useMultiOptions(options);

  useOnClickOutside([selectRef, optionsRef], () => {
    if (active) {
      setActive(false);
    }
  });

  const selectOption = useCallback((option) => () => {
    let newSelection;
    if (multiple) {
      newSelection = toggleOption(option, selection || []);
    } else {
      newSelection = option.value;
      setActive(false);
    }
    setSelection(newSelection);
    if (onChange) {
      onChange(newSelection);
    }
  }, [multiple, onChange, selection, toggleOption]);

  const classes = cx('select', `select--${size}`, {
    disabled,
    'select--error': Boolean(error),
    active,
  }, className);

  const optionsClasses = cx('select__options', {
    active,
  });

  function toggleOpen() {
    if (!disabled) {
      setActive((prevState) => !prevState);
    }
  }

  const selectAll = useCallback(() => {
    const newSelection = flatOptions.map((option) => option.value);
    setSelection(newSelection);
    if (onChange) {
      onChange(newSelection);
    }
  }, [onChange, flatOptions]);

  const deselectAll = useCallback(() => {
    const newSelection = [];
    setSelection(newSelection);
    if (onChange) {
      onChange(newSelection);
    }
  }, [onChange]);

  function renderSelectIcon() {
    const direction = active ? 'up' : 'down';
    return (
      <Icon
        className="select__caret-icon"
        icon={`fa-caret-${direction}`}
        color="gray-dark"
        size={size}
      />
    );
  }

  function renderMultiSelectOptionWrapper(children) {
    return (
      <>
        <div className="select__multi-header">
          <button
            className="select__multi-select-all"
            onClick={selectAll}
            type="button"
          >
            <Text theme="primary" semibold>{t('foundation.select.selectAll')}</Text>
          </button>
          <button
            className="select__multi-select-all"
            onClick={deselectAll}
            type="button"
          >
            <Text theme="primary" semibold>{t('foundation.select.deselectAll')}</Text>
          </button>
        </div>
        {children}
        {onSubmit &&
          <div className="select__multi-footer">
            <Button
              className="select__multi-submit flex-fill" onClick={() => {
                setActive(false);
                onSubmit(selection);
              }}
            >
              <Text theme="black" bold small>{t('common.actions.apply')}</Text>
            </Button>
          </div>
        }
      </>
    );
  }

  function renderOptions() {
    const optionList = multiple ? flatOptions : options;
    return optionList.map(({ level = 0, ...option }) => {
      const selected = multiple ? isMultiSelected(option, selection || []) : isSelected(option);
      return (
        <Option
          key={option.value}
          level={level}
          option={option}
          onSelect={selectOption}
          selected={selected}
          multiple={multiple}
        />
      );
    });
  }

  const optionsList = multiple
    ? renderMultiSelectOptionWrapper(renderOptions())
    : renderOptions();

  const formattedSelection = useMemo(() =>
    options.find((item) => item.value === selection)?.label || null
    , [options, selection]);
  const inputLabel = (multiple ? formatMultiSelection(selection) : formattedSelection) || label;


  let optionsPosition = null;
  if (selectRef && selectRef.current) {
    const { top, left, width, height } = selectRef.current.getBoundingClientRect();
    optionsPosition = {
      top: top + height,
      left,
      width,
    };
  }

  const getOptionsContainer = useCallback((content) => {
    if (inline) {
      return (
        <div className={optionsClasses} ref={optionsRef}>
          {content}
        </div>
      );
    } else {
      return (
        <ModalPortal>
          <div className={optionsClasses} style={optionsPosition} ref={optionsRef}>
            {content}
          </div>
        </ModalPortal>
      );
    }
  }, [inline, optionsClasses, optionsPosition]);

  return (
    <div ref={selectRef} className={classes}>
      <div className="select__head w-100" onClick={toggleOpen} onKeyDown={toggleOpen}>
        <span className="d-flex align-items-center justify-content-between w-100 mw-100">
          {icon && <Icon icon={icon} color="gray-dark" className="select__icon" />}
          <Text className="select__label" theme="gray" small>{inputLabel}</Text>
          {renderSelectIcon()}
        </span>
      </div>
      {optionsPosition && getOptionsContainer(optionsList)}
    </div>
  );
}

Select.propTypes = {
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  error: PropTypes.string,
  size: SizePropType,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      ...OptionType,
      children: PropTypes.arrayOf(OptionType),
    }).isRequired,
  ),
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  inline: PropTypes.bool,
};

Select.defaultProps = {
  icon: null,
  disabled: false,
  multiple: false,
  error: null,
  size: 'medium',
  onChange: null,
  onSubmit: null,
  className: '',
  defaultValue: null,
  inline: false,
};

export default Select;

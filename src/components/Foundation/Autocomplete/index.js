import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import slice from 'lodash/slice';

import { useOnClickOutside } from 'hooks';

import SuggestionItem from './Suggestion';

import Input from '../Input';
import Text from '../Text';

function Autocomplete({ suggestions, onSelect, inputProps, clearOnSelect, limit, popupClassName }) {
  const suggestionRef = createRef();
  const inputRef = createRef();
  const { t } = useTranslation();
  const [value, setValue] = useState(inputProps.value ?? '');
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useOnClickOutside([suggestionRef], () => {
    if (visible) {
      setVisible(false);
    }
    if (activeIndex) {
      setActiveIndex(0);
    }
  });

  function handleInputChanged(event) {
    setValue(event.target.value);
    return inputProps?.onChange?.(event);
  }

  function handleInputFocused() {
    setVisible(true);
  }

  function handleSelect(index) {
    setVisible(false);
    if (inputRef) {
      inputRef.current.blur();
    }
    setValue(clearOnSelect ? '' : suggestions[index]?.title);
    return onSelect?.(index);
  }

  function handleKeyDown(event) {
    const keyCode = event.nativeEvent.code;
    switch (keyCode) {
      case 'ArrowDown':
        event.preventDefault();
        if (activeIndex === null) {
          return setActiveIndex(0);
        }
        if (activeIndex < suggestions.length - 1) {
          setActiveIndex((prevState) => (prevState + 1));
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (activeIndex > 0) {
          setActiveIndex((prevState) => prevState - 1);
        }
        break;
      case 'Enter':
        event.preventDefault();
        return handleSelect(activeIndex);
      default:
    }
  }

  function renderSuggestionList() {
    if (!visible || !value.trim()) {
      return null;
    }
    const classes = cx('autocomplete__list', popupClassName);
    if (!suggestions.length) {
      return <div className={classes}><Text>{t('common.noResultsFound')}</Text></div>;
    }
    return (
      <div className={classes}>
        {slice(suggestions, 0, limit).map((suggestion, index) => (
          <SuggestionItem
            key={index.toString()}
            index={index}
            onClick={handleSelect}
            onMouseEnter={() => setActiveIndex(index)}
            active={index === activeIndex}
            search={value}
            {...suggestion}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="autocomplete" ref={suggestionRef}>
      <Input
        autoComplete="off"
        ref={inputRef}
        {...{ autoFocus: true, ...inputProps }}
        value={value}
        onChange={handleInputChanged}
        onFocus={handleInputFocused}
        onKeyDown={handleKeyDown}
      />
      {renderSuggestionList()}
    </div>
  );
}

Autocomplete.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    icon: PropTypes.string,
  })),
  onSelect: PropTypes.func,
  limit: PropTypes.number,
  inputProps: PropTypes.object.isRequired,
  clearOnSelect: PropTypes.bool,
  popupClassName: PropTypes.string,
};

Autocomplete.defaultProps = {
  suggestions: [],
  limit: 20,
  clearOnSelect: false,
  popupClassName: null,
};

export default Autocomplete;

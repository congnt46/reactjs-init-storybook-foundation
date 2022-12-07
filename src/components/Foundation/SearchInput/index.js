import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Input from 'components/Foundation/Input';

function SearchInput({
  className,
  onChange,
  onClear,
  clearIcon,
  ...rest
}) {
  const searchCloseIcon = clearIcon ? 'fa-close' : '';

  return (
    <div className={cx('search-input', className)}>
      <Input
        type="text"
        iconLeft="fa-search"
        onChange={(event) => onChange(event.target.value)}
        iconRight={searchCloseIcon}
        onClickIconRight={onClear}
        autoComplete="off"
        {...rest}
      />
    </div>
  );
}

SearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  clearIcon: PropTypes.bool,
};

SearchInput.defaultProps = {
  onClear: (_) => _,
  clearIcon: false,
};

export default SearchInput;

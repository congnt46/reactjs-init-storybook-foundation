import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Suggestion from '../Suggestion';

function SuggestionItem({ active, onMouseEnter, index, onClick, ...rest }) {
  function handleMouseEnter() {
    return onMouseEnter?.(index);
  }

  function handleClick() {
    return onClick(index);
  }

  const classes = cx('autocomplete__item', { active });

  return (
    <Suggestion
      className={classes}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      {...rest}
    />
  );
}

SuggestionItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  description: PropTypes.string,
  search: PropTypes.string,
  active: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  hint: PropTypes.oneOf(['highlight', 'bold']),
};

SuggestionItem.defaultProps = {
  active: false,
  onMouseEnter: null,
  description: null,
  icon: null,
  search: null,
  hint: 'highlight',
};

export default SuggestionItem;

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from '../Icon';
import Text from '../Text';
import MatchedText from '../MatchedText';

function Suggestion({ className, icon, title, description, search, onClick, onMouseEnter, hint }) {
  function matchedRenderer(match) {
    return <Text bold tag="span">{match}</Text>;
  }

  return (
    <button
      type="button"
      className={cx('suggestion', className)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {icon && <Icon icon={icon} size="small" className="suggestion__icon" />}
      <MatchedText
        semibold
        match={search}
        render={hint === 'bold' && matchedRenderer}
      >
        <Text semibold>
          {title}
        </Text>
      </MatchedText>
      {description && (
        <Text color="gray" className="suggestion__description">
          {description}
        </Text>
      )}
    </button>
  );
}

Suggestion.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  search: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func,
  hint: PropTypes.oneOf(['highlight', 'bold']),
};

Suggestion.defaultProps = {
  onMouseEnter: (_) => _,
  search: null,
  icon: null,
  hint: 'highlight',
};

export default Suggestion;

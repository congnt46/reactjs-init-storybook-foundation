import React from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';

import { ChildrenPropType } from 'types/prop-types';
import { colorNames, colors } from '../Variables';

function MatchedText({ match, matchColor, children, matchRenderer }) {
  const originalText = typeof children === 'string' ? children : children.props.children;
  const childrenComponent = typeof children === 'string' ? <Text>{children}</Text> : children;

  const index = originalText.toLowerCase().indexOf(match?.toLowerCase());
  const textFragments = [];

  if (index === -1) {
    return childrenComponent;
  }

  textFragments.push(originalText.substring(0, index));
  const textMatch = originalText.substring(index, index + match.length);
  const formattedMatch = matchRenderer ? matchRenderer(textMatch) : (
    React.cloneElement(childrenComponent, { tag: 'span', style: { color: colors[matchColor] }}, textMatch)
  );
  textFragments.push(formattedMatch);
  textFragments.push(originalText.substring(index + match.length));

  return (
    React.cloneElement(childrenComponent, {}, textFragments)
  );
}

MatchedText.propTypes = {
  match: PropTypes.string,
  matchColor: PropTypes.oneOf(colorNames),
  children: ChildrenPropType.isRequired,
  render: PropTypes.func, // (match) => ReactNode
};

MatchedText.defaultProps = {
  match: null,
  matchColor: 'tertiary-2',
  render: null,
};

export default MatchedText;

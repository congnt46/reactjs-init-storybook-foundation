import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ThemePropType, ChildrenPropType } from 'types/prop-types';
import { colorNames } from '../Variables';

function Text({ tag: Tag, className, children, theme, type, small, color, semibold, bold, style }) {
  const classes = cx(
    'text',
    type && `text--${type}`,
    `text--${theme}-theme`,
    className,
    color && `text--${color}`,
    {
      'text--small': small,
    },
    semibold && 'text--semibold',
    bold && 'text--bold',
  );
  return <Tag className={classes} style={style}>{children}</Tag>;
}

Text.propTypes = {
  tag: PropTypes.oneOf(['p', 'div', 'span']),
  theme: ThemePropType,
  small: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(['error-type', 'caption']),
  children: ChildrenPropType.isRequired,
  color: PropTypes.oneOf(colorNames),
  semibold: PropTypes.bool,
  bold: PropTypes.bool,
  style: PropTypes.object,
};

Text.defaultProps = {
  tag: 'p',
  small: false,
  className: '',
  theme: 'white',
  type: null,
  color: null,
  semibold: false,
  bold: false,
  style: null,
};

export default Text;

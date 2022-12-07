import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  ThemePropType,
  ChildrenPropType,
} from 'types/prop-types';
import { colorNames } from '../Variables';

function Title({ tag: Tag, size, theme, className, children, font, color, style }) {
  const classNames = cx(
    'title',
    `title--${theme}-theme`,
    className,
    size && `title--${size}`,
    color && `text--${color}`,
    font && `title--${font}`,
  );

  return <Tag className={classNames} style={style}>{children}</Tag>;
}

Title.propTypes = {
  tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div']),
  size: PropTypes.oneOf([64, 48, 32, 28, 24, 20, 18, 15]),
  font: PropTypes.oneOf(['medium', 'semibold', 'bold', 'regular']),
  theme: ThemePropType,
  className: PropTypes.string,
  children: ChildrenPropType.isRequired,
  color: PropTypes.oneOf(colorNames),
  style: PropTypes.object,
};

Title.defaultProps = {
  tag: 'p',
  theme: 'white',
  size: null,
  className: '',
  color: null,
  font: null,
  style: null,
};

export default Title;

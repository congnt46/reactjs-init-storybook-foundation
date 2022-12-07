import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import SizePropType from 'types/prop-types/SizePropType';

function Avatar({ size, alt, src, className }) {
  const classes = cx('avatar', `avatar--${size}`, className);
  return (
    <div className={classes}>
      <img src={src} alt={alt} />
    </div>
  );
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: SizePropType,
  className: PropTypes.string,
};

Avatar.defaultProps = {
  size: 'medium',
  className: '',
};

export default Avatar;

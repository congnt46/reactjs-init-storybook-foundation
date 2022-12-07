import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Text from '../Text';

function PageButton({ children, active, onClick, disabled }) {
  const classes = cx('pagination__button', { active });
  return (
    <button className={classes} type="button" onClick={onClick} disabled={disabled}>
      <Text bold small color="gray-dark">
        {children}
      </Text>
    </button>
  );
}

PageButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

PageButton.defaultProps = {
  active: false,
  disabled: false,
  onClick: null,
};

export default PageButton;

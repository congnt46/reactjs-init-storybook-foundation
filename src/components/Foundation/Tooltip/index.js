import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import SizePropType from 'types/prop-types/SizePropType';

import Icon from '../Icon';

function Tooltip({ position, text, iconSize, className }) {

  return (
    <div className={`custom-tooltip ${className}`}>
      <span className="custom-tooltip__content" data-tip={text} data-place={position}>
        <Icon icon="fa-info" size={iconSize} />
      </span>
      <ReactTooltip
        place="bottom"
        effect="solid"
        arrowColor="transparent"
        className="custom-tooltip__popup"
        border={false}
      />
    </div>
  );
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
  iconSize: SizePropType,
  className: PropTypes.string,
};

Tooltip.defaultProps = {
  position: 'bottom',
  iconSize: 'small',
  className: '',
};

export default Tooltip;

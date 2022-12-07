// Lib
import PropTypes from 'prop-types';

const RefPropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.shape({ current: PropTypes.object }),
]);

export default RefPropType;

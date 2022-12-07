import PropTypes from 'prop-types';

const PieLegendPropType = {
  showPercent: PropTypes.bool,
  label: PropTypes.string,
  subCharts: PropTypes.arrayOf(PropTypes.object),
};

export default PieLegendPropType;


import PropTypes from 'prop-types';

const SearchBarSuggestionType = {
  geoLevel: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchBarSuggestionType;

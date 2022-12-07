import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Text from '../Text';

function ResultStats({ total, currentPage, pageSize }) {
  const { t } = useTranslation();
  const from = ((currentPage - 1) * pageSize) + 1;
  const max = currentPage * pageSize;
  const to = max <= total ? max : total;
  return (
    <div className="d-flex">
      <Text semibold color="gray">
        {t('pagination.resultStats', { from, to, total })}
      </Text>
    </div>
  );
}

ResultStats.propTypes = {
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default ResultStats;

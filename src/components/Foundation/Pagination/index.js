import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import PageButton from './PageButton';
import ResultStats from './ResultStats';

import Button from '../Button';
import Icon from '../Icon';

const ELLIPSIS = {
  LEFT: 'ELLIPSIS-LEFT',
  RIGHT: 'ELLIPSIS-RIGHT',
};
const PAGE_GROUP_LIMIT = 3;

function Pagination({ currentPage, disabled, hideOnSinglePage, onChange, pageSize, total, className, showResultStats }) {
  const { t } = useTranslation();
  const numberOfPages = Math.ceil(total / pageSize);
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (onChange) {
      onChange(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (!numberOfPages || (numberOfPages === 1 && hideOnSinglePage)) {
    return null;
  }

  function handlePreviousPage() {
    setPage((prevState) => prevState - 1);
  }

  function handleNextPage() {
    setPage((prevState) => prevState + 1);
  }

  function getButtonRange() {
    if (numberOfPages <= PAGE_GROUP_LIMIT + 2) {
      return Array.from({ length: numberOfPages }, (_item, index) => index + 1);
    }
    const showEllipsisLeft = (page - 1 >= PAGE_GROUP_LIMIT);
    const showEllipsisRight = (numberOfPages - page >= PAGE_GROUP_LIMIT);
    let pages;
    if (showEllipsisLeft) {
      pages = [1, ELLIPSIS.LEFT];
    } else {
      pages = Array.from({ length: PAGE_GROUP_LIMIT + 1 }, (_item, index) => index + 1);
    }
    if (showEllipsisRight) {
      if (showEllipsisLeft) {
        pages = [...pages, page - 1, page, page + 1];
      }
      pages.push(ELLIPSIS.RIGHT);
    } else {
      const lastPages = Array.from({ length: PAGE_GROUP_LIMIT }, (_item, index) => {
        return numberOfPages - PAGE_GROUP_LIMIT + index;
      });
      pages = [...pages, ...lastPages];
    }
    pages = [...pages, numberOfPages];
    return pages;
  }

  function renderPageButtons() {
    const range = getButtonRange();
    return (
      <>
        {range.map((value) => {
          if (value === ELLIPSIS.LEFT || value === ELLIPSIS.RIGHT) {
            return <EllipsisIcon key={value.toString()} />;
          }
          return (
            <PageButton
              disabled={disabled}
              active={page === value}
              key={value.toString()}
              onClick={() => setPage(value)}
            >
              {value}
            </PageButton>
          );
        })}
      </>
    );
  }

  const btnGroupClasses = cx('pagination__button-group', {
    'flex-grow-1': !showResultStats,
  });

  return (
    <div className={`pagination ${className}`}>
      <div className={btnGroupClasses}>
        <Button
          size="small"
          iconLeft="fa-angle-left"
          type="alternative"
          disabled={page === 1 || disabled}
          onClick={handlePreviousPage}
        >
          {t('common.actions.previous')}
        </Button>
        <div className="d-flex align-items-center">
          {renderPageButtons()}
        </div>
        <Button
          size="small"
          iconRight="fa-angle-right"
          type="alternative"
          disabled={page === numberOfPages || disabled}
          onClick={handleNextPage}
        >
          {t('common.actions.next')}
        </Button>
      </div>
      {showResultStats && (
        <ResultStats pageSize={pageSize} currentPage={page} total={total} />
      )}
    </div>
  );
}

function EllipsisIcon() {
  return (
    <Icon className="pagination__ellipsis" icon="fa-ellipsis-h" size="small" color="gray" />
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  disabled: PropTypes.bool,
  hideOnSinglePage: PropTypes.bool,
  showResultStats: PropTypes.bool,
  total: PropTypes.number,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

Pagination.defaultProps = {
  currentPage: 1,
  pageSize: 10,
  disabled: false,
  hideOnSinglePage: false,
  showResultStats: false,
  total: 0,
  onChange: null,
  className: '',
};

export default Pagination;

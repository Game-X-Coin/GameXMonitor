import React from 'react';
import classNames from 'classnames';

import './style.scss';

const DEFAULT_PAGE_COUNT = 5;

const Pagination = ({
  page = 0,
  perPage = 0,
  count = 0,
  onChange = () => null
}) => {
  const pageCount = Math.ceil(count / perPage);
  const paginationCount =
    pageCount < DEFAULT_PAGE_COUNT ? pageCount : DEFAULT_PAGE_COUNT;

  const isMin = page === 1;
  const isMax = page === pageCount;

  return (
    <div className="r-pagination">
      <button
        className={classNames(isMin && 'disabled')}
        onClick={() => onChange(page - 1)}
      >
        Prev
      </button>
      {Array.from({ length: paginationCount }, (v, i) => {
        const paginationNum =
          i + 1 + (Math.ceil(page / paginationCount) - 1) * paginationCount;
        const active = paginationNum === page;

        return (
          <button
            key={paginationNum}
            className={classNames(active && 'active')}
            onClick={() => onChange(paginationNum)}
          >
            {paginationNum}
          </button>
        );
      })}
      <button
        className={classNames(isMax && 'disabled')}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

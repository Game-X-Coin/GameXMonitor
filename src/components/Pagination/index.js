import React from 'react';
import classNames from 'classnames';

import './style.scss';

const PAGINATE_ROW = 5;

const Pagination = ({ current = 0, total = 0, onChange = () => null }) => {
  const isMin = current === 1;
  const isMax = current === total;

  return (
    <div className="r-pagination">
      <button
        className={classNames(isMin && 'disabled')}
        onClick={() => onChange(current - 1)}
      >
        Prev
      </button>
      {Array.from({ length: PAGINATE_ROW }, (v, i) => {
        const page =
          i + 1 + (Math.ceil(current / PAGINATE_ROW) - 1) * PAGINATE_ROW;
        const active = page === current;

        return (
          <button
            key={page}
            className={classNames(active && 'active')}
            onClick={() => onChange(page)}
          >
            {page}
          </button>
        );
      })}
      <button
        className={classNames(isMax && 'disabled')}
        onClick={() => onChange(current + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

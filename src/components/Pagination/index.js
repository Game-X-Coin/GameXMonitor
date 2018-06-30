import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const Pagination = ({ current, total, prevLink, nextLink }) => {
  const isMin = current === 1;
  const isMax = current === total;

  return (
    <div className="r-pagination">
      <Link className={isMin ? 'disabled' : ''} to={prevLink}>
        Prev
      </Link>
      <Link className={isMax ? 'disabled' : ''} to={nextLink}>
        Next
      </Link>
    </div>
  );
};

export default Pagination;

import React from 'react';

import './EmptyState.scss';

const EmptyState = props => {
  return (
    <div className="empty-state">
      <p>{props.children}</p>
    </div>
  );
};

export default EmptyState;

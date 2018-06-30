import React from 'react';

const EmptyState = props => {
  return (
    <div className="py-5 text-center">
      <h5>{props.children}</h5>
    </div>
  );
};

export default EmptyState;

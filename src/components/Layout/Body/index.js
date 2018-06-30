import React from 'react';
import './style.scss';

const Body = props => {
  return (
    <div className="body flex-fill">
      <div className="container">{props.children}</div>
    </div>
  );
};

export default Body;

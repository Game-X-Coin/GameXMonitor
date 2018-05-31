import React from 'react';
import './style.scss';

const JumboTron = props => {
  return (
    <div className="jumbo-tron">
      <div className="container">
        <h1>{props.children}</h1>
      </div>
    </div>
  );
};

export default JumboTron;

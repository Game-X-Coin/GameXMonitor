import React from 'react';
import './style.scss';

const Body = props => {
  return <div className="body flex-fill">{props.children}</div>;
};

export default Body;

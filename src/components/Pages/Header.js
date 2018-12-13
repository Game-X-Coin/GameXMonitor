import React from 'react';

const Header = props => {
  return (
    <h5 className="d-flex justify-content-between align-items-end px-0 pb-2">
      {props.children}
    </h5>
  );
};

export default Header;

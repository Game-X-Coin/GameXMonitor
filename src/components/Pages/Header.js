import React from 'react';

const Header = props => {
  return (
    <h3 className="d-flex justify-content-between align-items-end p-2">
      {props.children}
    </h3>
  );
};

export default Header;

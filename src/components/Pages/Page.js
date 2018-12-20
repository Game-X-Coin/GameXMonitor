import React from 'react';

import './Page.scss';

const Page = props => {
  return <div className="page container">{props.children}</div>;
};

export default Page;

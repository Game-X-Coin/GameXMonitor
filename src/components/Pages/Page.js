import React from 'react';

const Page = props => {
  return (
    <div className="container py-5">
        {props.children}
    </div>
  );
};

export default Page;

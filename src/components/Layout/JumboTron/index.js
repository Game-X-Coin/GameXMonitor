import React from 'react';

import SearchInput from '../Header/SearchInput'

import './style.scss';

const JumboTron = props => {
  return (
    <div className="jumbo-tron">
      <div className="container">
        <p>Track the history of</p>
        <h1>GAME X COIN</h1>

        <SearchInput />  

      </div>
    </div>
  );
};

export default JumboTron;

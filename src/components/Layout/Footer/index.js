import React from 'react';

import { images } from '../../../constants/images';

import './style.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <img className="logo" src={images.logo_footer} alt="logo" />
        <div>
          <p className="m-0">Ⓒ 2018 GXC World Pte Ltd</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

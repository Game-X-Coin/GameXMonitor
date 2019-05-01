import React from 'react';

import { images } from '../../../constants/images';

import './style.scss';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <img className="logo" src={images.logo_footer} alt="logo" />
        <div>
          <p className="m-0">Ⓒ {year} GXC World Pte Ltd</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

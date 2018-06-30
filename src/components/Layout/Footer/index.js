import React from 'react';

import logo from '../../../media/images/logo/logo_footer.svg';
import './style.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <img className="logo" src={logo} alt="logo" />
        <div>
          <a
            className="d-block text-light"
            href="mailto:support@bcventures.io"
            title="support mail"
          >
            support@bcventures.io
          </a>
          <p className="m-0">Ⓒ 2018 GXC World Pte Ltd</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

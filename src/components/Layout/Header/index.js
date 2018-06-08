import React, { Component } from 'react';
import classNames from 'classnames';
import { Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import SearchInput from './SearchInput';
import JumboTron from '../JumboTron';

import logo from '../../../media/images/logo/logo_white.svg';
import './style.scss';

class Header extends Component {
  renderLinks(links) {
    return links.map(link => (
      <NavItem className="px-3" key={link.to}>
        <NavLink className="text-white" tag={Link} to={link.to}>
          {link.name}
        </NavLink>
      </NavItem>
    ));
  }

  render() {
    /* const links = [
      { name: 'Wallet', to: '/wallet' },
      { name: 'Game', to: '/game' }
    ]; */

    const isRoot = window.location.pathname === '/';

    return (
      <React.Fragment>
        <header className={classNames('header', isRoot && 'root')}>
          <Navbar className="container">
            <NavbarBrand tag={Link} to="/">
              <img className="logo" src={logo} alt="logo" />
            </NavbarBrand>
            <SearchInput />
          </Navbar>
        </header>

        {isRoot && (
          <JumboTron>Check GXC block and transaction information</JumboTron>
        )}
      </React.Fragment>
    );
  }
}

export default Header;

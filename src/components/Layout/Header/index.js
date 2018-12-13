import React, { Component } from 'react';
import { Navbar, Nav, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import logo from '../../../media/images/logo/logo_white.svg';
import './style.scss';

class Header extends Component {
  renderLinks(links) {
    return links.map(link => (
      <NavItem className="pl-5" key={link.to}>
        <NavLink className="text-white" tag={Link} to={link.to}>
          {link.name}
        </NavLink>
      </NavItem>
    ));
  }

  render() {
    const links = [
      { name: 'Blocks', to: '/blocks' },
      { name: 'Transactions', to: '/transactions' },
      { name: 'Tokens', to: '/tokens' },
    ];

    return (
        <header className='header'>
          <Navbar className="container">
            <NavbarBrand tag={Link} to="/">
              <img className="logo" src={logo} alt="logo" />
            </NavbarBrand>

            <Nav className="ml-auto" navbar>
              {this.renderLinks(links)}
            </Nav>
            
          </Navbar>
        </header>
    );
  }
}

export default Header;

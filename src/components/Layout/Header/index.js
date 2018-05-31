import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';

import logo from '../../../media/images/logo/logo_white.svg';
import './style.scss';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

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
    const links = [
      { name: 'Wallet', to: '/wallet' },
      { name: 'Game', to: '/game' }
    ];

    return (
      <header className="header">
        <Navbar color="light" light expand="md" className="container">
          <NavbarBrand tag={Link} to="/">
            <img className="logo" src={logo} alt="logo" />
          </NavbarBrand>
          <NavbarToggler onClick={() => this.toggle()} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.renderLinks(links)}
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;

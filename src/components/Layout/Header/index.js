import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Navbar, Nav, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Form, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import { searchHelper } from '../../../utils/searchHelper';
import { images } from '../../../constants/images';

import './style.scss';

@withRouter
@observer
class Header extends Component {
  searchRef = React.createRef();

  @observable
  isSearchActive = false;

  showSearchBar() {
    this.isSearchActive = true;

    setTimeout(() => {
      this.searchRef.current.focus();
    }, 0);
  }

  hideSearchBar() {
    this.isSearchActive = false;
    this.searchRef.current.value = '';
  }

  async handleSearch(e) {
    e.preventDefault();

    const { value } = this.searchRef.current;

    const routerName = await searchHelper(value);

    this.props.history.push(routerName);
  }

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
      { name: 'Transactions', to: '/transactions' }
      /*  { name: 'Tokens', to: '/tokens' }, */
    ];

    return (
      <div className="header-wrapper">
        <header className="header">
          <Navbar className="container">
            <NavbarBrand tag={Link} to="/">
              <img className="logo" src={images.logo_header} alt="logo" />
              <h1 className="bold">GAME X MONITOR</h1>
            </NavbarBrand>

            <Nav className="ml-auto" navbar>
              {this.renderLinks(links)}

              <div className="divider" />

              <NavItem
                className="search-button"
                onClick={() => this.showSearchBar()}
              >
                <svg className="search-icon" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
                Search
              </NavItem>

              <Form
                className={classNames(
                  'search-bar',
                  this.isSearchActive && 'active'
                )}
                onSubmit={e => this.handleSearch(e)}
              >
                <Input
                  innerRef={this.searchRef}
                  type="search"
                  placeholder="Block, Transaction, Account"
                  autoComplete="search"
                />

                <div
                  className="close-icon"
                  onClick={() => this.hideSearchBar()}
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </div>
              </Form>
            </Nav>
          </Navbar>
        </header>
      </div>
    );
  }
}

export default Header;

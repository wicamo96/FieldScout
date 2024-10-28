import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import './NavBar.css';

export const BasicNavbar = () => {

  return (
    <div>
      <Navbar className='navFix' container='fluid'>
        <NavbarBrand href="/">Field Scout</NavbarBrand>
        <Nav className="gap-x">
            <NavItem>
                <NavLink href="/login">Log In</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/register">
                Register
                </NavLink>
            </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}
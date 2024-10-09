import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

export const BasicNavbar = () => {

  return (
    <div>
      <Navbar container='fluid'>
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
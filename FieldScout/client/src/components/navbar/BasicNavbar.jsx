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
        <NavbarBrand className='navBrand' href="/">Field Scout</NavbarBrand>
        <Nav className="gap-x">
            <NavItem>
                <NavLink className='navText' href="/login">Log In</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className='navText' href="/register">
                Register
                </NavLink>
            </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}
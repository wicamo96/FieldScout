import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

export const ApplicationNavbar = () => {
    return (
        <div>
        <Navbar container='fluid'>
            <NavbarBrand href="/">Field Scout</NavbarBrand>
            <Nav className="gap-x">
                <NavItem>
                    <NavLink href="/greenhouseManagement">
                        Greenhouse Management
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/pests">
                        Pest Management
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/scouting">
                        Scouting
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/trends">
                        Trends
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/login" onClick={() => {
                                                localStorage.removeItem("fieldScout_user")
                    }}>
                        Log Out
                    </NavLink>
                </NavItem>
            </Nav>
        </Navbar>
        </div>
    )
}
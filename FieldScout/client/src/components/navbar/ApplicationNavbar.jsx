import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import './NavBar.css'
import { useNavigate } from 'react-router-dom';

export const ApplicationNavbar = () => {
    const navigate = useNavigate()
    
    return (
        <div>
        <Navbar className="navFix" container='fluid'>
            <NavbarBrand href="/">Field Scout</NavbarBrand>
            <Nav className="ml-auto">
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
            {/* <NavbarText>
                <button onClick={() => {
                                localStorage.removeItem("fieldScout_user")
                                navigate("/login")}}>
                    Log Out
                </button>
            </NavbarText> */}
        </Navbar>
        </div>
    )
}
import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import './NavBar.css'
import { useNavigate } from 'react-router-dom';

export const ApplicationNavbar = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)
    
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
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Trends
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                            <NavLink href="/trends">
                                Graph Visualization
                            </NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            Heat Maps
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
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
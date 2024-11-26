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
            <NavbarBrand className='navBrand' href="/">Field Scout</NavbarBrand>
            <Nav className="ml-auto">
                <NavItem>
                    <NavLink className='navText' href="/greenhouseManagement">
                        Greenhouse Management
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='navText' href="/pests">
                        Pest Management
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='navText' href="/scouting">
                        Scouting
                    </NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle className='navText' nav caret>
                        Trends
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                            <NavLink className='navDropdownText' href="/trends">
                                Graph Visualization
                            </NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink className='navDropdownText' href="/map">
                                Heat Map
                            </NavLink>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                    <NavLink className='navText' href="/login" onClick={() => {
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
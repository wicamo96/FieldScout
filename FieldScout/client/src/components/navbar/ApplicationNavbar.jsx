import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Collapse,
  NavbarToggler
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
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen}>
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
            </Collapse>
        </Navbar>
        </div>
    )
}
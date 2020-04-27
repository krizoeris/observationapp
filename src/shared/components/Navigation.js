// Dependencies
import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faBook, faFile, faList } from '@fortawesome/free-solid-svg-icons'
import {
    Collapse, Navbar, NavbarToggler,
    NavbarBrand, Nav, NavItem, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

// Local
import './Navigation.css';
import AppContext from '../../AppContext'

const Navigation = () => {
    // Global State
    const [globalState, setGlobalState] = useContext(AppContext)
    // Local State
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    let userType = globalState.userType

    return (
        <Navbar className="main-nav shadow-sm" color="dark" dark expand="lg">
            <NavbarBrand className="navbar-brand" href="#">Observation App</NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse isOpen={!collapsed} navbar>
                <Nav className="mx-auto" navbar>
                    <NavItem className="p-1">
                        <NavLink className="nav-link pl-md-3 pr-md-3 home" to="/">
                            <FontAwesomeIcon icon={faHome} /> Home
                        </NavLink>
                    </NavItem>
                    <NavItem className="p-1">
                        <NavLink className="nav-link pl-md-3 pr-md-3" to="/admin/users">
                            <FontAwesomeIcon icon={faUser} /> Users
                        </NavLink>
                    </NavItem>
                    <NavItem className="p-1">
                        <NavLink className="nav-link pl-md-3 pr-md-3" to="/admin/subjects">
                            <FontAwesomeIcon icon={faBook} /> Subjects
                        </NavLink>
                    </NavItem>
                    <NavItem className="p-1">
                        <NavLink className="nav-link pl-md-3 pr-md-3" to="/admin/grades">
                            <FontAwesomeIcon icon={faFile} /> Grades
                        </NavLink>
                    </NavItem>
                    <NavItem className="p-1">
                        <NavLink className="nav-link pl-md-3 pr-md-3" to="/admin/forms">
                            <FontAwesomeIcon icon={faList} /> Forms
                        </NavLink>
                    </NavItem>
                </Nav>

                <Nav navbar>
                    <UncontrolledDropdown className="p-1" nav inNavbar>
                        <DropdownToggle nav caret>
                            {userType}
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>Logout</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default Navigation

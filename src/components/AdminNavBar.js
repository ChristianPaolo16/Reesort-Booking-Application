import { NavLink } from 'react-router-dom';
import { Fragment, useContext } from 'react';

import UserContext from '../UserContext.js';

import { Container , Nav , Navbar, NavDropdown } from 'react-bootstrap'

export default function AdminNavBar() {

    const {user} = useContext(UserContext);

    return (
        <Navbar expand="lg" fixed='top'>
            <Container className='border-bottom p-0'>
                <Navbar.Brand as = {NavLink} to ='/admin' className='ms-5'><img id='brand' src="https://res.cloudinary.com/dr4rwlp7t/image/upload/v1676900128/capstone3/paradiseBlack_sphczm.png"/></Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="ms-auto me-5">
                    
                    <NavDropdown title="Rooms" id="basic-nav-dropdown">
                        <NavDropdown.Item as = {NavLink} to = '/adminAddRoom'>
                            Add Room
                        </NavDropdown.Item>
                        <NavDropdown.Item as = {NavLink} to = '/adminViewRooms'>
                            View Rooms
                        </NavDropdown.Item>
                    </NavDropdown>
                        
                    <NavDropdown title="Activities" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.2">
                            Add Activity
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            View Activities
                        </NavDropdown.Item>
                    </NavDropdown>
                        
                    <NavDropdown title="Foods" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.2">
                            Add Food
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            View Foods
                        </NavDropdown.Item>
                    </NavDropdown>
                    

                    {
                        user ?
                        <Nav.Link as = {NavLink} to = "/logout">Logout</Nav.Link>
                        :
                        <Fragment>
                            <Nav.Link as = {NavLink} to ="/adminRegister">Register</Nav.Link>
                            <Nav.Link as = {NavLink} to ="/adminLogin">Login</Nav.Link>
                        </Fragment>
                        
                    }
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
    
}
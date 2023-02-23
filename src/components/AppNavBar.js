import { NavLink } from 'react-router-dom';
import { Fragment, useContext } from 'react';

import UserContext from '../UserContext.js';

import { Container , Nav , Navbar } from 'react-bootstrap'

export default function AppNavBar() {

    const {user} = useContext(UserContext);

    return (
        <Navbar expand="lg" fixed='top' id='appNav'>
            <Container className='border-bottom p-0'>
                <Navbar.Brand as = {NavLink} to ='/' className='ms-5'><img id='brand' src="https://res.cloudinary.com/dr4rwlp7t/image/upload/v1676900128/capstone3/paradiseBlack_sphczm.png"/></Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="ms-auto me-5">
                    
                        <Nav.Link as = {NavLink} to = '/'>
                            Home
                        </Nav.Link>

                        <Nav.Link as = {NavLink} to = '/bookNow'>
                            Book Now
                        </Nav.Link>
                    

                    {
                        user ?
                        <Fragment>
                            <Nav.Link as = {NavLink} to = "/userBookings">Bookings</Nav.Link>
                            <Nav.Link as = {NavLink} to = "/logout">Logout</Nav.Link>
                        </Fragment>
                        :
                        <Fragment>
                            <Nav.Link as = {NavLink} to ="/register">Register</Nav.Link>
                            <Nav.Link as = {NavLink} to ="/login">Login</Nav.Link>
                        </Fragment>
                        
                    }
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
    
}
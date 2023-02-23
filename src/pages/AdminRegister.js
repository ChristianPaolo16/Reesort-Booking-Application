import { Row, Col, Button, Form } from 'react-bootstrap';
import { Fragment, useEffect, useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import UserContext from '../UserContext.js';
import Swal from 'sweetalert2';
import AppNavBar from '../components/AppNavBar.js';

export default function AdminRegister () {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobileNo, setMobileNo] = useState('');

    const {user, setUser} = useContext(UserContext);
    
    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate();
    
    useEffect(() => {
        if (firstName !=="" && lastName !=="" && mobileNo !=="" && email !=="" && password !== "" && confirmPassword !=="" && password === confirmPassword) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [firstName, lastName, mobileNo, email, password, confirmPassword])

    function register(event){
        event.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/user/adminRegister`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                mobileNo: mobileNo,
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {

            if (data ===false) {
                Swal.fire({
                    title: "Registration unsuccessful",
                    icon: 'error',
                    text: "Please try again"
                })
            } else {
                Swal.fire({
                    title: "Registration Successful",
                    icon: 'success',
                    text: "Congratulations, you are now registered in our website!"
                })

                navigate("/login")
            }
        })

    }

    return (
        user ?
        <Navigate to = "*"/>
        :
        <Fragment>
            <AppNavBar/>
            <div id='register'>
                <Row id = 'registerText'>
                    <Col className='text-center'>
                        <h3>Register</h3>
                    </Col>
                </Row>
                <Row id='registerForm'>
                    <Col className='offset-4 col-4'>
                        <Form onSubmit = {event => register(event)}>

                            <Form.Group className="mb-3" controlId="formBasicFirstName">

                                <Form.Label>First Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter First Name" 
                                    value={firstName}
                                    onChange = {event => setFirstName(event.target.value)}
                                    required
                                />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicLastName">

                                <Form.Label>Last Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Last Name" 
                                    value={lastName}
                                    onChange = {event => setLastName(event.target.value)}
                                    required
                                />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">

                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter email" 
                                    value={email}
                                    onChange = {event => setEmail(event.target.value)}
                                    required
                                />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicMobileNo">

                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Mobile Number" 
                                    value={mobileNo}
                                    onChange = {event => setMobileNo(event.target.value)}
                                />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">

                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange = {event => setPassword(event.target.value)}
                                    required
                                />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">

                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    value={confirmPassword}
                                    onChange = {event => setConfirmPassword(event.target.value)}
                                    required
                                />

                            </Form.Group>

                            {
                                isActive ? 
                                <Button variant="primary" type="submit">
                                    Register
                                </Button>
                                :
                                <Button variant="danger" type="submit" disabled>
                                    Register
                                </Button>
                            }
                        </Form>
                    </Col>
                </Row>
            </div>
        </Fragment>

    )
    
}
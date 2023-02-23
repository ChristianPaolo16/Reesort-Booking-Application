import { Fragment, useEffect, useState, useContext } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext.js';
import Swal from 'sweetalert2'
import AppNavBar from '../components/AppNavBar.js';


export default function AdminLogin () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);

    const {user, setUser} = useContext(UserContext);

    const navigate = useNavigate();

    function login(event){
        event.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
        .then(result => result.json())
        .then(data => {
            
            if (data === false) {
                Swal.fire({
                    title: "Authentication Failed!",
                    icon: 'error',
                    text: "Please try again!"
                })
            } else {
                localStorage.setItem('token', data.auth)
                retrieveUserDetails(localStorage.getItem('token'));

                Swal.fire({
                    title: "Authentication Successful!",
                    icon: 'success',
                    text: "Welcome to Paradise!"
                })
                
                navigate('/admin');
            }

            
        })

        const retrieveUserDetails = (token) => {

            fetch(`${process.env.REACT_APP_API_URL}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(result => result.json())
            .then(data => {

                setUser({
                    id: data._id,
                    isAdmin: data.isAdmin
                })
            })
        }
    }

    useEffect(() => {
        if (email !== "" && password !== "") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    })

    return (
        user ?
        <Navigate to = "*"/>
        :
        <Fragment>
            <AppNavBar/>
            <div id='register'>
                <Row id = 'loginText'>
                    <Col className='offset-4'>
                        <h3>Login</h3>
                    </Col>
                </Row>
                <Row id='loginForm'>
                    <Col className='offset-4 col-4'>
                        <Form onSubmit = {event => login(event)}>

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

                            {
                                isActive ? 
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                                :
                                <Button variant="danger" type="submit" disabled>
                                    Login
                                </Button>
                            }
                        </Form>
                    </Col>
                </Row>
            </div>
        </Fragment>
    );

}
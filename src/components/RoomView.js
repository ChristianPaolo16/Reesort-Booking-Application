import { Fragment } from "react";
import AppNavBar from "./AppNavBar";
import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

import UserContext from '../UserContext.js';


export default function RoomView () {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [availableRooms, setAvailableRooms] = useState('');
    const [picture, setPicture] = useState('');
    const [bookingDate, setBookingDate] = useState('');

	const {user} = useContext(UserContext);

    const {roomId} = useParams();

    const navigate = useNavigate;

    const handleDateChange = (event) => {
        setBookingDate(event.target.value);
    };

    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_URL}/room/getRoom/${roomId}`)
        .then(result => result.json())
        .then(data => {

            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
            setAvailableRooms(data.availableRooms);
            setPicture(data.picture);
        })


    }, [roomId]);

    const bookRoom = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/user/bookRoom/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                bookingDate: bookingDate
            })
        })
        .then(result => result.json())
        .then(data => {
            if (data === true) {
                Swal.fire({
                    title: "Successfully booked!",
                    icon: "success",
                    text: "Please pay reservation fee."
                })

                navigate('/userBookings')
            } else {
                Swal.fire({
                    title: "Booking unsuccessful!",
                    icon: 'error',
                    text: 'Please try again'
                })
            }
        })
    }

    return(

        <Fragment>
            <AppNavBar/>
            
            <Container className="mt-5">
                <Row>
                    <Col lg={{ span: 6, offset: 3 }}>
                        <Card>
                            <Card.Img variant="top" src={picture} />
                            <Card.Body className="text-center">
                                <Card.Title>{name}</Card.Title>
                                <Card.Subtitle>Description:</Card.Subtitle>
                                <Card.Text>{description}</Card.Text>
                                <Card.Subtitle>Price:</Card.Subtitle>
                                <Card.Text>PhP {price}</Card.Text>
                                <Card.Subtitle>Available Rooms</Card.Subtitle>
                                <Card.Text>{availableRooms}</Card.Text>
                                
                                <Card.Subtitle>Set Booking Date</Card.Subtitle>
                                <Card.Text><input type="date" value={bookingDate} onChange={handleDateChange} /></Card.Text>

                                {
                                    user ?
                                    <Button variant="primary" onClick = {() => bookRoom(roomId)}>Book Room</Button>
                                    :
                                    <Button as = {Link} to = '/login'>Login</Button>
                                }
                                

                            </Card.Body>        
                        </Card>
                    </Col>
                </Row>
            </Container>

        </Fragment>
    )

}
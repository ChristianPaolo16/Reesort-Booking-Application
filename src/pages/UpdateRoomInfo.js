import { Row, Col, Button, Form } from 'react-bootstrap';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNavBar from '../components/AdminNavBar';
import Swal from 'sweetalert2';

export default function UpdateRoomInfo () {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [availableRooms, setAvailableRooms] = useState('');
    const [picture, setPicture] = useState('');
    
    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate();

    const {roomId} = useParams();

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

    useEffect(() => {
        if (name !=="" && description !=="" && price !=="" && availableRooms !=="" && picture !=="") {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [name, description, price, availableRooms, picture])

    useEffect(() => {
        if (name !=="" && description !=="" && price !=="" && availableRooms !=="" && picture !=="") {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [name, description, price, availableRooms, picture])

    function updateRoom(id){

        fetch(`${process.env.REACT_APP_API_URL}/room/updateRoomInfo/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price,
                availableRooms: availableRooms,
                picture: picture
            })
        })
        .then(response => response.json())
        .then(data => {

            if (data ===false) {
                Swal.fire({
                    title: "Failed to update Room",
                    icon: 'error',
                    text: "Please try again"
                })
            } else {
                Swal.fire({
                    title: "Successfully Updated Room",
                    icon: 'success',
                    text: `You have now updated ${name}`
                })

                navigate("/adminViewRooms")
            }
        })

    }

    return(
        <Fragment>
			<AdminNavBar/>
            <div id='updateRoom'>
                <Row id = 'updateRoomText'>
                    <Col className='text-center'>
                        <h3>Update Room Info</h3>
                    </Col>
                </Row>
                <Row id='updateRoomForm'>
                    <Col className='offset-4 col-4'>
                        <Form onSubmit = {() => updateRoom(roomId)}>

                            <Form.Group className="mb-3" controlId="formBasicName">

                                <Form.Label>Room Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Room Name" 
                                    value={name}
                                    onChange = {event => setName(event.target.value)}
                                    required
                                />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicDescription">

                                <Form.Label>Description</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Description" 
                                    value={description}
                                    onChange = {event => setDescription(event.target.value)}
                                    required
                                />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPrice">

                                <Form.Label>Price</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="Enter Price" 
                                    value={price}
                                    onChange = {event => setPrice(event.target.value)}
                                    required
                                />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicAvailableRooms">

                                <Form.Label>Available Rooms</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Available Rooms" 
                                    value={availableRooms}
                                    onChange = {event => setAvailableRooms(event.target.value)}
                                />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPicture">

                                <Form.Label>Picture</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="http://example.com" 
                                    value={picture}
                                    onChange = {event => setPicture(event.target.value)}
                                />

                            </Form.Group>

                            
                            {
                                isActive ? 
                                <Button variant="primary" type="submit" className='me-3'>
                                    Update
                                </Button>
                                :
                                <Button variant="primary" type="submit" className='me-3' disabled>
                                    Update
                                </Button>
                            }
                        </Form>
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
    
} 
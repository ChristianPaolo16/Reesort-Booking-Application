import { Fragment, useState, useEffect } from 'react'
import AdminNavBar from '../components/AdminNavBar.js'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function AddRoom () {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [availableRooms, setAvailableRooms] = useState('');
    const [picture, setPicture] = useState('');
    
    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate();
    
    useEffect(() => {
        if (name !=="" && description !=="" && price !=="" && availableRooms !=="" && picture !=="") {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [name, description, price, availableRooms, picture])

    function addRoom(event){
        event.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/room/addRoom`, {
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
                    title: "Failed to add Room",
                    icon: 'error',
                    text: "Please try again"
                })
            } else {
                Swal.fire({
                    title: "Successfully Added Room",
                    icon: 'success',
                    text: `You have now added ${name}`
                })

                navigate("/admin")
            }
        })

    }

    function addAnotherRoom(event){
        event.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/room/addRoom`, {
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
                    title: "Failed to add Room",
                    icon: 'error',
                    text: "Please try again"
                })
            } else {
                Swal.fire({
                    title: "Successfully Added Room",
                    icon: 'success',
                    text: `You have now added ${name}`
                })

                navigate("/adminAddRoom")
            }
        })

    }

	return(
        <Fragment>
			<AdminNavBar/>
            <div id='addRoom'>
                <Row id = 'addRoomText'>
                    <Col className='text-center'>
                        <h3>Add Room</h3>
                    </Col>
                </Row>
                <Row id='registerForm'>
                    <Col className='offset-4 col-4'>
                        <Form onSubmit = {event => addRoom(event)}>

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
                                <div>
                                <Button variant="primary" type="submit" className='me-3'>
                                    Add
                                </Button>
                                <Button variant="primary" type="submit" onClick = {event => addAnotherRoom(event)}>
                                    Add another
                                </Button>
                                </div>
                                :
                                <div>
                                <Button variant="primary" className='me-3' disabled>
                                    Add
                                </Button>
                                <Button variant="primary" disabled onClick = {event => addAnotherRoom(event)}>
                                    Add another
                                </Button>
                                </div>
                            }
                        </Form>
                    </Col>
                </Row>
            </div>
        </Fragment>
	)

}
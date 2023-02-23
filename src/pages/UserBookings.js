import { Fragment, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import AppNavBar from "../components/AppNavBar";
import RoomsBooked from "../components/RoomsBooked";


export default function UserBookings () {

    const [roomsBooked, setRoomsBooked] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/user/roomsBooked`, {
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(result => result.json())
        .then(data => {
            setRoomsBooked(data.map(room => {
                return (
                    <RoomsBooked key = {room._id} roomBookedProp = {room}/>
                )
            }))
        })

        
    }, [])

    return(
        <Fragment>
            <AppNavBar/>
            <div id="userBookings">
                <Row>
                    <Col className="text-center">
                        <h3 id="userBookingsText">Welcome to Paradise!</h3>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="offset-2 col-8">
                        <h4 className="border-bottom">Room Bookings</h4>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col className="offset-2 col-2 border-bottom">
                        <h5>Room Name</h5>
                    </Col>

                    <Col className="col-3 border-bottom">
                        <h5>Booking Date</h5>
                    </Col>

                    <Col className="col-3 border-bottom">
                        <h5>Status</h5>
                    </Col>
                </Row>

                {roomsBooked}
                
            </div>
        </Fragment>
    )
    
}
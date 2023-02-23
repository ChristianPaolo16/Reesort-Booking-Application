import { Row, Col } from "react-bootstrap";
import { useEffect, useState, Fragment } from 'react';

import AdminNavBar from '../components/AdminNavBar.js';
import AdminViewRoom from '../components/AdminViewRoom.js'

export default function AdminViewRooms () {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/room/getAllRooms`, {
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(result => result.json())
        .then(data => {
            setRooms(data.map(room => {
                return (
                    <AdminViewRoom key = {room._id} adminRoomProp = {room}/>
                )
            }))
        })

        
    }, [])

    return( 
        <Fragment>
            <AdminNavBar/>
            <div id="adminViewRooms">

                <Row>
                    <Col className="offset-1 col-2 border-bottom">
                        <h5>NAME</h5>
                    </Col>
                    <Col className="col-3 border-bottom">
                        <h5>DESCRIPTION</h5>
                    </Col>
                    <Col className="col-1 border-bottom">
                        <h5>PRICE</h5>
                    </Col>
                    <Col className="col-1 border-bottom">
                        <h5>ACTIVE</h5>
                    </Col>
                    <Col className="col-3 border-bottom">
                        <h5>ACTIONS</h5>
                    </Col>
                </Row>

                {rooms}
                
                

            </div>
        </Fragment>


        
    )

}
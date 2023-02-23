import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import AppNavBar from "../components/AppNavBar.js"
import RoomCard from "../components/RoomCard.js";

export default function BookNow () {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/room/getActiveRooms`)
        .then(result => result.json())
        .then(data => {
            setRooms(data.map(room => {
                return (
                    <RoomCard key = {room._id} roomProp = {room}/>
                )
            }))
        })
        
    }, [])

    return(
        <div id="bookNow">
            <AppNavBar/>
            <Row id="roomsText">
                <Col className="offset-1">
                    <h3>Rooms</h3>
                </Col>
            </Row>
            
            {rooms}

        </div>

    )
    
}
import { Row, Button, Col } from "react-bootstrap"
import UserContext from "../UserContext";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

export default function RoomCard ({roomProp}) {

    const {_id, name, description, picture, availableRooms } = roomProp;

    const [isDisabled, setIsDisabled] = useState(false);

    const {user} = useContext(UserContext);
    
    useEffect(()=> {
        if (availableRooms === 0) {
            setIsDisabled(true);
        }
    }, [availableRooms]);
    
    return(
        <Row className="container-fluid mb-5">

            <Col className="offset-2 col-3">
                <img className="img-fluid" src={picture}/>
            </Col>
            <Col>
                <h5>{name}</h5>
                <p>{description}</p>
                {/* { */}
                    {/* user ? */}
                    <Button as = {Link} to = {`/room/${_id}`}>See more details</Button>
                    
                    {/* <Button as = {Link} to = "/login">Login</Button> */}
                {/* } */}

            </Col>
            
        </Row>

    )
}
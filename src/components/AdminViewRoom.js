import { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AdminViewRoom ({adminRoomProp}) {

    const {_id, name, description, price, isActive } = adminRoomProp;

    const [active, setIsActive] = useState(isActive)

    function archiveRoom(id) {

        fetch(`${process.env.REACT_APP_API_URL}/room/archiveRoom/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })

        setIsActive(false)

    }

    function unarchiveRoom(id) {

        fetch(`${process.env.REACT_APP_API_URL}/room/unarchiveRoom/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })

        setIsActive(true)

    }
    

    return(
        <Row id={`adminView-${_id}`} className='mt-3'>
            <Col className="offset-1 col-2 border-bottom">
                <h5>{name}</h5>
            </Col>

            <Col className="col-3 border-bottom">
                <h5>{description}</h5>
            </Col>

            <Col className="col-1 border-bottom">
                <h5>{price}</h5>
            </Col>

            <Col className="col-1 border-bottom">
                <h5>{active.toString()}</h5>
            </Col>

            <Col className="col-3 border-bottom">
                {
                    active ?
                    <Button variant="danger" onClick = {() => archiveRoom(_id)}>Archive</Button>
                    :
                    <Button variant="primary" onClick = {() => unarchiveRoom(_id)}>Unarchive</Button>
                }
                <Button variant="secondary" as = {Link} to = {`/admin/updateRoomInfo/${_id}`}>Update</Button>

            </Col>
        </Row>
    )
    
}
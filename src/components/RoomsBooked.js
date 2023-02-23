import { Fragment,useState, useContext } from "react";
import UserContext from "../UserContext";
import { Row, Col, Button } from "react-bootstrap";

export default function RoomsBooked ({roomBookedProp}) {

    const { _id, name, bookingDate, status } = roomBookedProp;

    const {user} = useContext(UserContext);

    const [isPending, setIsPending] = useState(status)

    function cancelRoomBooking (id) {
        fetch(`${process.env.REACT_APP_API_URL}/user/cancelRoomBooking/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })

        setIsPending("Cancelled")

    }

    return (
        <Fragment>
            <Row id={`roomBooking-${_id}`} className='mt-3'>
                <Col className="offset-2 col-2 border-bottom mt-3">
                    <h6>{name}</h6>
                </Col>

                <Col className="col-3 border-bottom mt-3">
                    <h6>{bookingDate}</h6>
                </Col>

                <Col className="col-2 border-bottom mt-3">
                    <h6>{isPending}</h6>
                </Col>

                <Col className="col-1 border-bottom">
                {
                    isPending =="Pending" ?
                    <Button className='m-2' variant="danger" onClick = {() => cancelRoomBooking(_id)}>Cancel</Button>
                    :
                    <Button className='m-2' variant="danger" hidden onClick = {() => cancelRoomBooking(_id)}>Cancel</Button>
                }
                </Col>
            </Row>
        </Fragment>
    )
    
}
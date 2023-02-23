import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound () {

    return(
        <Fragment>
            <Row className="text-center mt-5">
                <Col>
                    <h1>Page Not Found</h1>
                    <img id="image404" src="https://res.cloudinary.com/dr4rwlp7t/image/upload/v1677026370/capstone3/swat_xokbhe.jpg" alt="Error 404"/>
                    <p>Go back to the <Link to = '/'>homepage</Link></p>
                </Col>
            </Row>
        </Fragment>
    )               
    
}
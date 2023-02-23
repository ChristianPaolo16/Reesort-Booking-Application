import { Fragment } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import React from "react";

export default function Contact () {

    return(
        <Fragment>
            <Row id='contact' className="mt-5 mx-0">
                <Col className="offset-1 col-6">
                    <h3>Message us</h3>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicFullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicMessage">
                            <Form.Label>Message</Form.Label>
                            <Form.Control type="text" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Fragment>
    )
    
}
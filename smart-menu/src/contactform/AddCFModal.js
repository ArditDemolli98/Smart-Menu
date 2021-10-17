import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddCFModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:5000/api/contactform/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CF_FirstName: event.target.CF_FirstName.value,
                CF_LastName: event.target.CF_LastName.value,
                CF_Email: event.target.CF_Email.value,
                CF_SecondEmail: event.target.CF_SecondEmail.value,
                CF_Subject: event.target.CF_Subject.value,
                CF_Message: event.target.CF_Message.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            },
                (error) => {
                    alert('Failed');
                })
    }
    render() {
        return (
            <div className="container">

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Write Message
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="CF_FirstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" name="CF_FirstName" required
                                            placeholder="First Name" />
                                    </Form.Group>
                                    <Form.Group controlId="CF_LastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" name="CF_LastName" required
                                            placeholder="Last Name" />
                                    </Form.Group>
                                    <Form.Group controlId="CF_Email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="text" name="CF_Email" required
                                            placeholder="Email" />
                                    </Form.Group>
                                    <Form.Group controlId="CF_SecondEmail">
                                        <Form.Label>Second Email</Form.Label>
                                        <Form.Control type="text" name="CF_SecondEmail" required
                                            placeholder="Email" />
                                    </Form.Group>
                                    <Form.Group controlId="CF_Subject">
                                        <Form.Label>Subject</Form.Label>
                                        <Form.Control type="text" name="CF_Subject" required
                                            placeholder="Subject" />
                                    </Form.Group>
                                    <Form.Group controlId="CF_Message">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control type="text" name="CF_Message" required
                                            placeholder="Message" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Submit Message
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}
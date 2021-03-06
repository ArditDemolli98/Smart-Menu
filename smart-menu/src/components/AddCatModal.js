import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import config from 'config';
import { Account } from '../account/Index';
import { accountService } from '@/_services';
export default class AddCatModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(config.apiUrl + '/api/category/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserID: accountService.userValue.id,
                CategoryName: event.target.CategoryName.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.props.onHide()
            },
                (error) => {
                    alert('Failed');
                })
    }
    render() {
        return (
            <div className="w-0">

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Category
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="CategoryName">
                                        <Form.Label>CategoryName</Form.Label>
                                        <Form.Control type="text" name="CategoryName" required
                                            placeholder="CategoryName" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Category
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
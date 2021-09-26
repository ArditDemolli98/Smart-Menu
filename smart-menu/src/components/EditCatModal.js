import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import config from 'config';
import { Account } from '../account/Index';
export default class EditCatModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(config.apiUrl + '/api/category/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CategoryID: event.target.CategoryID.value,
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
    deleteCat(catid) {
        if (window.confirm('Are you sure?')) {
            fetch(config.apiUrl + '/api/Category/' + catid, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
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
                            Edit Category
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="CategoryID">
                                        <Form.Label>categoryID</Form.Label>
                                        <Form.Control type="text" name="CategoryID" required
                                            disabled
                                            defaultValue={this.props.categoryid}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="CategoryName">
                                        <Form.Label>CategoryName</Form.Label>
                                        <Form.Control type="text" name="CategoryName" required
                                            defaultValue={this.props.categoryname}
                                            placeholder="CategoryName" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Category
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                        <Button className="mr-2" variant="danger"
                            onClick={() => this.deleteCat(this.props.categoryid)}>
                            Delete
                        </Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}
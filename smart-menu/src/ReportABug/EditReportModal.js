import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { accountService } from '@/_services';
export class EditReportModal extends Component {
    constructor(props) {
        super(props);
        this.state = { bugs: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/bugtypes/')
            .then(response => response.json())
            .then(data => {
                this.setState({ bugs: data });
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:5000/api/reportabug/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ReportID: event.target.ReportID.value,
                ReportName: event.target.ReportName.value,
                ReportBugType: event.target.ReportBugType.value,
                ReportDescription: event.target.ReportDescription.value
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
                            Edit Report
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="ReportID">
                                        <Form.Label>ID</Form.Label>
                                        <Form.Control type="text" name="ReportID" required
                                            disabled
                                            defaultValue={this.props.repid}
                                            placeholder="ID" />
                                    </Form.Group>

                                    <Form.Group controlId="ReportName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="ReportName" required
                                            defaultValue={this.props.repname}
                                            placeholder="Name" />
                                    </Form.Group>

                                    <Form.Group controlId="ReportBugType">
                                        <Form.Label>Bug Type</Form.Label>
                                        <Form.Control as="select" defaultValue={this.props.repbugtype}>
                                            {this.state.bugs.map(bug =>
                                                <option key={bug.BugID}>{bug.BugType}</option>)}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="ReportDescription">
                                        <Form.Label>Report Description</Form.Label>
                                        <Form.Control type="text" name="ReportDescription" required
                                            defaultValue={this.props.repdescription}
                                            placeholder="Description" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Report
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
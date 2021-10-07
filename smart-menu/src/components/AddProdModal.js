import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';
import config from 'config';

export default class AddProdModal extends Component {
    constructor(props) {
        super(props);
        this.state = { cat: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);
    }

    photofilename = "anonymous.png";
    imagesrc = config.apiUrl + '/Photos/' + this.photofilename;

    handleSubmit(event) {
        event.preventDefault();
        fetch(config.apiUrl + '/api/product/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ProductName: event.target.ProductName.value,
                CategoryID: this.props.categoryid,
                ProductDescription: event.target.ProductDescription.value,
                ProductPrice: event.target.Price.value,
                PhotoFileName: this.photofilename
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

    handleFileSelected(event) {
        event.preventDefault();
        this.photofilename = event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(config.apiUrl + '/api/Product/SaveFile', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then((result) => {
                this.imagesrc = config.apiUrl + '/Photos/' + result;
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
                            Add Product
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="CategoryName">
                                        <Form.Label>CategoryName</Form.Label>
                                        <Form.Control as="select" disabled={true} defaultValue={this.props.categoryid}>
                                            <option key={this.props.categoryid}>{this.props.categoryname}</option>)
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="ProductName">
                                        <Form.Label>ProductName</Form.Label>
                                        <Form.Control type="text" name="ProductName" required
                                            placeholder="ProductName" />
                                    </Form.Group>
                                    <Form.Group controlId="ProductDescription">
                                        <Form.Label>ProductDescription</Form.Label>
                                        <Form.Control type="text" name="ProductDescription"
                                            placeholder="ProductDescription" />
                                    </Form.Group>
                                    <Form.Group controlId="ProductPrice">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="number" name="Price" required
                                            placeholder="Price" />
                                    </Form.Group>
                                    <Modal.Footer>
                                        <Button variant="primary" type="submit">
                                            Add Product
                                        </Button>
                                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                                    </Modal.Footer>
                                </Form>
                            </Col>
                            <Col sm={6}>
                                <Image width="200px" height="200px" src={this.imagesrc} />
                                <input onChange={this.handleFileSelected} type="File" />
                            </Col>
                        </Row>
                    </Modal.Body>



                </Modal>

            </div>
        )
    }

}
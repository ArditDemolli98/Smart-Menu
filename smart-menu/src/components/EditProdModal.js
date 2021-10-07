import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';
import config from 'config';

export default class EditProdModal extends Component {
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
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ProductID: this.props.prodid,
                ProductName: event.target.ProductName.value,
                CategoryID: event.target.CategoryName.value,
                ProductDescription: event.target.ProductDescription.value,
                ProductPrice: event.target.Price.value,
                PhotoFileName: this.prodfilename
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert('Success')
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
                });
    }

    deleteProd(prodid) {
        if (window.confirm('Are you sure?')) {
            fetch(config.apiUrl + '/api/Product/' + prodid, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            })
                .then(res => res.json())
                .then((result) => {
                    alert('Success')
                    this.props.onHide()
                },
                    (error) => {
                        alert('Failed');
                    });
        }
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
                            Edit Product
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="ProductName">
                                        <Form.Label>ProductName</Form.Label>
                                        <Form.Control type="text" name="ProductName" required
                                            defaultValue={this.props.prodname} />
                                    </Form.Group>
                                    <Form.Group controlId="CategoryName">
                                        <Form.Label>CategoryName</Form.Label>
                                        <Form.Control as="select" defaultValue={this.props.prodcategoryid}>
                                            {this.props.categories.map(cat =>
                                                <option key={cat.categoryID} value={cat.categoryID} >{cat.categoryName}</option>)}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="ProductDescription">
                                        <Form.Label>ProductDescription</Form.Label>
                                        <Form.Control type="text" name="ProductDescription"
                                            defaultValue={this.props.proddescription}
                                            placeholder="ProductDescription" />
                                    </Form.Group>
                                    <Form.Group controlId="ProductPrice">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="number" name="Price" required
                                            placeholder="Price"
                                            defaultValue={this.props.prodprice} />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Update Product
                                    </Button>
                                </Form>
                            </Col>
                            <Col sm={6}>
                                <Image width="200px" height="200px"
                                    src={config.apiUrl + '/Photos/' + this.props.prodfilename} />
                                <input onChange={this.handleFileSelected} type="File" />
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        {/* <Button variant="primary" type="submit">
                            Update Product
                        </Button> */}
                        <Button className="mr-2" variant="danger"
                            onClick={() => this.deleteProd(this.props.prodid)}>
                            Delete
                        </Button>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}
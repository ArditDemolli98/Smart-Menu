import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditReviewModal extends Component{
    constructor(props){
        super(props);
        this.state={rats:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch('http://localhost:5000/api/rating/')
        .then(response=>response.json())
        .then(data=>{
            this.setState({rats:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:5000/api/review/',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ReviewID:event.target.ReviewID.value,
                ReviewName:event.target.ReviewName.value,
                ReviewRating:event.target.ReviewRating.value,
                ReviewMessage:event.target.ReviewMessage.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }
    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit Review
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="ReviewID">
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text" name="ReviewID" required
                        disabled
                        defaultValue={this.props.revid} 
                        placeholder="ID"/>
                    </Form.Group>

                    <Form.Group controlId="ReviewName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="ReviewName" required 
                        defaultValue={this.props.revname}
                        placeholder="Name"/>
                    </Form.Group>

                    <Form.Group controlId="ReviewRating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.revrating}>
                        {this.state.rats.map(rat=>
                            <option key={rat.RatingID}>{rat.RatingDescription}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="ReviewMessage">
                        <Form.Label>Message</Form.Label>
                        <Form.Control type="text" name="ReviewMessage" required 
                        defaultValue={this.props.revmessage}
                        placeholder="Message"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Review
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
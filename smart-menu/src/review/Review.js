import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { accountService } from '@/_services';
import { AddReviewModal } from './AddReviewModal';
import { EditReviewModal } from './EditReviewModal';
import { Role } from '@/_helpers';


export class Review extends Component {

    constructor(props) {
        super(props);
        this.state = { revs: [], addModalShow: false, editModalShow: false }
    }

    refreshList() {
        fetch('http://localhost:5000/api/review', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ revs: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteReview(revid) {
        if (window.confirm('Are you sure?')) {
            fetch('http://localhost:5000/api/review/' + revid, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }


    render() {
        const { revs, revid, revname, revrating, revmessage } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });

        return (
            <div className="container">
                <h1>This is the Reviews section!</h1>
                <p>Below you can submit reviews about our smart menu app and also check out the reviews others have left for us!</p>

                <ButtonToolbar>

                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        Show Review Form</Button>

                    <AddReviewModal show={this.state.addModalShow}
                        onHide={addModalClose} />

                </ButtonToolbar>


                <Table className="mt-4" striped bordered hover size="sm" >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Rating</th>
                            <th>Message</th>
                            {accountService.userValue.role === Role.Admin &&
                                <th>Options</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {revs.map(rev =>
                            <tr key={rev.ReviewID}>
                                <td>{rev.ReviewName}</td>
                                <td>{rev.ReviewRating}</td>
                                <td>{rev.ReviewMessage}</td>
                                {accountService.userValue.role === Role.Admin &&
                                    <td>

                                        <ButtonToolbar>
                                            <Button className="mr-2" variant="info"
                                                onClick={() => this.setState({
                                                    editModalShow: true,
                                                    revid: rev.ReviewID, revname: rev.ReviewName, revrating: rev.ReviewRating,
                                                    revmessage: rev.ReviewMessage
                                                })}>
                                                Edit
                                            </Button>

                                            <Button className="mr-2" variant="danger"
                                                onClick={() => this.deleteReview(rev.ReviewID)}>
                                                Delete
                                            </Button>

                                            <EditReviewModal show={this.state.editModalShow}
                                                onHide={editModalClose}
                                                revid={revid}
                                                revname={revname}
                                                revrating={revrating}
                                                revmessage={revmessage}
                                            />
                                        </ButtonToolbar>

                                    </td>
                                }
                            </tr>
                        )}
                    </tbody>
                </Table>

            </div>
        )
    }
}
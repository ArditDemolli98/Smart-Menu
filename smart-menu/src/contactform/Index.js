import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { accountService } from '@/_services';
import { AddCFModal } from './AddCFModal';
import { Role } from '@/_helpers';
import config from 'config';


export class Index extends Component {

    constructor(props) {
        super(props);
        this.state = { cfs: [], addModalShow: false }
    }

    refreshList() {
        fetch('http://localhost:5000/api/contactform', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ cfs: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteCF(cfid) {
        if (window.confirm('Are you sure?')) {
            fetch('http://localhost:5000/api/contactform/' + cfid, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }


    render() {
        const { cfs, cfid, cfname } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });

        return (
            <div className="container">
                <h1>This is the Contact section!</h1>
                <p>Below you can submit messages to contact with us or check the messages that you've previously sent to us.</p>

                <ButtonToolbar>

                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        Show Contact Form</Button>

                    <AddCFModal show={this.state.addModalShow}
                        onHide={addModalClose} />

                </ButtonToolbar>

                {accountService.userValue.role === Role.Admin &&
                    <Table className="mt-4" striped bordered hover size="sm" >
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cfs.map(cf =>
                                <tr key={cf.CF_ID}>
                                    <td>{cf.CF_FirstName}</td>
                                    <td>{cf.CF_LastName}</td>
                                    <td>{cf.CF_Email}</td>
                                    <td>{cf.CF_Subject}</td>
                                    <td>{cf.CF_Message}</td>
                                    <td>
                                        <ButtonToolbar>


                                            <Button className="mr-2" variant="danger"
                                                onClick={() => this.deleteCF(cf.CF_ID)}>
                                                Delete
                                            </Button>
                                        </ButtonToolbar>
                                    </td>

                                </tr>
                            )}
                        </tbody>
                    </Table>
                }
            </div>
        )
    }
}